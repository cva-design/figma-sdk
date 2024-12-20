import { describe, expect, it, vi } from 'vitest';
import { MessageBus } from '../../src';
import { TestCommands, TestEvents, createMockListener, createTestCommand, createTestEvent } from '../utils';

describe('Load Testing', () => {
  describe('High Message Volume', () => {
    it('should handle high volume of commands', async () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const handler = vi
        .fn()
        .mockImplementation(() => ({ status: 'accepted' as const }));
      bus.handleCommand('TestCommand', handler);

      const count = 1000;
      const commands = Array(count)
        .fill(0)
        .map((_, i) => createTestCommand(`cmd-${i}`, `data-${i}`));

      const results = await Promise.all(
        commands.map((cmd) => bus.sendCommand('TestCommand', cmd)),
      );

      expect(handler).toHaveBeenCalledTimes(count);
      for (const result of results) {
        expect(result.status).toBe('accepted');
      }
    });

    it('should handle high volume of events', () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TestEvent', listener);

      const count = 1000;
      const events = Array(count)
        .fill(0)
        .map((_, i) => createTestEvent(`evt-${i}`, `data-${i}`));

      for (const evt of events) {
        bus.publishEvent('TestEvent', evt);
      }
      expect(listener).toHaveBeenCalledTimes(count);
    });
  });

  describe('Many Listeners', () => {
    it('should maintain performance with many listeners', () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const listenerCount = 100;
      const listeners = Array(listenerCount)
        .fill(0)
        .map(() => createMockListener());

      // Register all listeners
      for (const listener of listeners) {
        bus.listenToEvent('TestEvent', listener);
      }

      const eventCount = 100;
      const events = Array.from({ length: eventCount }, (_, i) => ({
        id: `event-${i}`,
        data: `data-${i}`,
      }));

      const start = performance.now();
      for (const evt of events) {
        bus.publishEvent('TestEvent', evt);
      }
      const end = performance.now();

      // Each listener should have received all events
      for (const listener of listeners) {
        expect(listener).toHaveBeenCalledTimes(eventCount);
      }

      // Performance check: should process all events within reasonable time
      // Adjust threshold based on your requirements
      expect(end - start).toBeLessThan(1000); // 1 second
    });
  });

  describe('Operation Batching', () => {
    it('should efficiently batch operations', async () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const handler = vi
        .fn()
        .mockImplementation(() => ({ status: 'accepted' as const }));
      bus.handleCommand('TestCommand', handler);

      const batchSize = 100;
      const batches = 10;
      const operations = Array(batchSize * batches)
        .fill(0)
        .map((_, i) => ({
          id: `op-${i}`,
          data: `data-${i}`,
        }));

      const start = performance.now();

      // Process operations in batches
      for (let i = 0; i < batches; i++) {
        const batch = operations.slice(i * batchSize, (i + 1) * batchSize);
        await Promise.all(
          batch.map((op) => bus.sendCommand('TestCommand', op)),
        );
      }

      const end = performance.now();

      expect(handler).toHaveBeenCalledTimes(batchSize * batches);
      // Performance check: should process all batches within reasonable time
      expect(end - start).toBeLessThan(2000); // 2 seconds
    });

    it('should maintain order in batched operations', async () => {
      const bus = new MessageBus<TestCommands, TestEvents>();
      const processedIds: string[] = [];

      const handler = vi.fn().mockImplementation((data: TestCommands['TestCommand']) => {
        processedIds.push(data.id);
        return { status: 'accepted' as const };
      });

      bus.handleCommand('TestCommand', handler);

      const operations = Array(50)
        .fill(0)
        .map((_, i) => ({
          id: `${i}`,
          data: `data-${i}`,
        }));

      await Promise.all(
        operations.map((op) => bus.sendCommand('TestCommand', op)),
      );

      // Check if the order is maintained within each batch
      processedIds.forEach((id, index) => {
        expect(Number.parseInt(id)).toBe(index);
      });
    });
  });
});
