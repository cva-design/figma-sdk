import type { JsonObject, JsonValue } from 'type-fest';
import { describe, expect, it, vi } from 'vitest';
import { MessageBus } from '../../src';
import { createMockListener } from '../utils/helpers';

// Base interface for batch operations
interface BatchOperationBase {
  id: string;
  type: string;
  payload: JsonObject;
}

// Operation type that extends both BatchOperationBase and JsonObject
type BatchOperation = BatchOperationBase & JsonObject;

// Command interfaces with proper typing
interface BatchCommandBase {
  operations: BatchOperation[];
  atomic?: boolean;
}

type BatchCommand = BatchCommandBase & JsonObject;

interface BatchCommands {
  ExecuteBatch: BatchCommand;
  [key: string]: JsonObject;
}

// Event interfaces with proper typing
interface BatchEventBase {
  operations: BatchOperation[];
  status: 'completed' | 'failed';
  error?: string;
}

type BatchEvent = BatchEventBase & JsonObject;

interface BatchEvents {
  BatchStarted: { batchId: string } & JsonObject;
  BatchCompleted: BatchEvent;
  BatchFailed: BatchEvent;
  OperationCompleted: (BatchOperation & { batchId: string }) & JsonObject;
  [key: string]: JsonObject;
}

describe('Batch Processing', () => {
  describe('Change Batching', () => {
    it('should preserve operation order', async () => {
      const bus = new MessageBus<BatchCommands, BatchEvents>();
      const completedOperations: string[] = [];

      bus.listenToEvent('OperationCompleted', (event) => {
        completedOperations.push(event.id);
      });

      const operations: BatchOperation[] = Array(5)
        .fill(0)
        .map((_, i) => ({
          id: `op-${i}`,
          type: 'TEST_OP',
          payload: { value: i },
        }));

      bus.handleCommand('ExecuteBatch', async ({ operations }) => {
        for (const op of operations) {
          bus.publishEvent('OperationCompleted', {
            ...op,
            batchId: 'test-batch',
          });
        }
        bus.publishEvent('BatchCompleted', {
          operations,
          status: 'completed',
        });
        return { status: 'accepted' as const };
      });

      await bus.sendCommand('ExecuteBatch', { operations });

      // Verify operations were completed in order
      operations.forEach((op, index) => {
        expect(completedOperations[index]).toBe(op.id);
      });
    });

    it('should handle atomic operations', async () => {
      const bus = new MessageBus<BatchCommands, BatchEvents>();
      const listener = createMockListener();
      bus.listenToEvent('BatchFailed', listener);

      const operations: BatchOperation[] = [
        { id: 'op-1', type: 'TEST_OP', payload: { value: 1 } },
        { id: 'op-2', type: 'FAIL_OP', payload: { value: 2 } },
        { id: 'op-3', type: 'TEST_OP', payload: { value: 3 } },
      ];

      bus.handleCommand('ExecuteBatch', async ({ operations, atomic }) => {
        if (atomic) {
          const failedOp = operations.find((op) => op.type === 'FAIL_OP');
          if (failedOp) {
            bus.publishEvent('BatchFailed', {
              operations,
              status: 'failed',
              error: 'Operation failed',
            });
            return {
              status: 'rejected' as const,
              message: 'Atomic batch failed',
            };
          }
        }

        for (const op of operations) {
          bus.publishEvent('OperationCompleted', {
            ...op,
            batchId: 'test-batch',
          });
        }
        bus.publishEvent('BatchCompleted', {
          operations,
          status: 'completed',
        });
        return { status: 'accepted' as const };
      });

      const result = await bus.sendCommand('ExecuteBatch', {
        operations,
        atomic: true,
      });

      expect(result.status).toBe('rejected');
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'failed',
          error: expect.any(String),
        }),
      );
    });

    it('should validate batch integrity', async () => {
      const bus = new MessageBus<BatchCommands, BatchEvents>();
      const listener = createMockListener();
      bus.listenToEvent('BatchStarted', listener);

      const operations: BatchOperation[] = [
        { id: 'op-1', type: 'TEST_OP', payload: { value: 1 } },
        { id: 'op-1', type: 'TEST_OP', payload: { value: 2 } }, // Duplicate ID
      ];

      bus.handleCommand('ExecuteBatch', async ({ operations }) => {
        const ids = new Set<string>();
        const hasDuplicates = operations.some((op) => {
          if (ids.has(op.id)) return true;
          ids.add(op.id);
          return false;
        });

        if (hasDuplicates) {
          return {
            status: 'rejected' as const,
            message: 'Duplicate operation IDs found',
          };
        }

        bus.publishEvent('BatchStarted', { batchId: 'test-batch' });
        return { status: 'accepted' as const };
      });

      const result = await bus.sendCommand('ExecuteBatch', { operations });
      expect(result.status).toBe('rejected');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should handle rollback scenarios', async () => {
      const bus = new MessageBus<BatchCommands, BatchEvents>();
      const rollbackLog: string[] = [];

      const operations: BatchOperation[] = [
        { id: 'op-1', type: 'TEST_OP', payload: { value: 1 } },
        { id: 'op-2', type: 'FAIL_OP', payload: { value: 2 } },
        { id: 'op-3', type: 'TEST_OP', payload: { value: 3 } },
      ];

      bus.handleCommand('ExecuteBatch', async ({ operations, atomic }) => {
        let failed = false;
        const completedOps: BatchOperation[] = [];

        for (const op of operations) {
          if (op.type === 'FAIL_OP') {
            failed = true;
            break;
          }
          completedOps.push(op);
          bus.publishEvent('OperationCompleted', {
            ...op,
            batchId: 'test-batch',
          });
        }

        if (failed && atomic) {
          // Rollback completed operations in reverse order
          for (const op of completedOps.reverse()) {
            rollbackLog.push(`rollback-${op.id}`);
          }

          bus.publishEvent('BatchFailed', {
            operations,
            status: 'failed',
            error: 'Operation failed, rolling back',
          });
          return {
            status: 'rejected' as const,
            message: 'Batch failed and rolled back',
          };
        }

        return { status: 'accepted' as const };
      });

      const result = await bus.sendCommand('ExecuteBatch', {
        operations,
        atomic: true,
      });

      expect(result.status).toBe('rejected');
      expect(rollbackLog).toEqual(['rollback-op-1']);
      expect(rollbackLog.length).toBe(1);
    });
  });
});
