import { MessageBus } from '../../src';
import type { JsonObject, JsonValue } from 'type-fest';
import { describe, expect, it, vi } from 'vitest';
import { createMockListener } from '../utils/helpers';

interface BaseNodeOperation extends JsonObject {
  id: string;
  type: string;
  children?: BaseNodeOperation[];
  [key: string]: JsonValue | BaseNodeOperation[] | undefined;
}

interface NodeOperation extends BaseNodeOperation {
  children?: BaseNodeOperation[];
}

interface NodeCommands {
  CreateNode: NodeOperation;
  [key: string]: JsonObject;
}

interface NodeEvents {
  NodeCreated: NodeOperation;
  [key: string]: JsonObject;
}

describe('Complex Data Handling', () => {
  describe('Nested Node Operations', () => {
    it('should handle deeply nested node operations', async () => {
      const bus = new MessageBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('NodeCreated', listener);

      const handler = vi.fn().mockImplementation((data) => {
        bus.publishEvent('NodeCreated', data);
        return { status: 'accepted' as const };
      });

      bus.handleCommand('CreateNode', handler);

      const nestedNode = {
        id: 'root',
        type: 'FRAME',
        children: [
          {
            id: 'child1',
            type: 'GROUP',
            children: [
              { id: 'grandchild1', type: 'RECTANGLE' },
              { id: 'grandchild2', type: 'ELLIPSE' },
            ],
          },
          {
            id: 'child2',
            type: 'GROUP',
            children: [{ id: 'grandchild3', type: 'TEXT' }],
          },
        ],
      };

      const result = await bus.sendCommand('CreateNode', nestedNode);
      expect(result.status).toBe('accepted');
      expect(listener).toHaveBeenCalledWith(nestedNode);
    });

    it('should handle empty collections', async () => {
      const bus = new MessageBus<NodeCommands>();
      const handler = vi
        .fn()
        .mockImplementation(() => ({ status: 'accepted' as const }));
      bus.handleCommand('CreateNode', handler);

      const emptyNode = {
        id: 'empty',
        type: 'GROUP',
        children: [],
      };

      const result = await bus.sendCommand('CreateNode', emptyNode);
      expect(result.status).toBe('accepted');
      expect(handler).toHaveBeenCalledWith(emptyNode);
    });
  });

  describe('Group Operations', () => {
    it('should handle group operations with mixed node types', async () => {
      const bus = new MessageBus<NodeCommands>();
      const handler = vi
        .fn()
        .mockImplementation(() => ({ status: 'accepted' as const }));
      bus.handleCommand('CreateNode', handler);

      const mixedGroup: NodeOperation = {
        id: 'mixed',
        type: 'GROUP',
        children: [
          { id: 'text1', type: 'TEXT' },
          { id: 'rect1', type: 'RECTANGLE' },
          {
            id: 'subgroup',
            type: 'GROUP',
            children: [{ id: 'ellipse1', type: 'ELLIPSE' }],
          },
        ],
      };

      const result = await bus.sendCommand('CreateNode', mixedGroup);
      expect(result.status).toBe('accepted');
      expect(handler).toHaveBeenCalledWith(mixedGroup);
    });
  });

  describe('Large Payloads', () => {
    it('should handle large nested structures', async () => {
      const bus = new MessageBus<NodeCommands>();
      const handler = vi
        .fn()
        .mockImplementation(() => ({ status: 'accepted' as const }));
      bus.handleCommand('CreateNode', handler);

      // Create a deep tree with many nodes
      const createDeepTree = (
        depth: number,
        breadth: number,
      ): BaseNodeOperation => {
        if (depth === 0) {
          return { id: `leaf-${Math.random()}`, type: 'RECTANGLE' };
        }

        const children = Array(breadth)
          .fill(0)
          .map(() => createDeepTree(depth - 1, breadth));

        return {
          id: `group-${depth}-${Math.random()}`,
          type: 'GROUP',
          children,
        };
      };

      const largePayload = createDeepTree(5, 3) as NodeOperation; // Creates 3^5 = 243 nodes
      const result = await bus.sendCommand('CreateNode', largePayload);

      expect(result.status).toBe('accepted');
      expect(handler).toHaveBeenCalledWith(largePayload);
    });

    it('should handle Map objects and complex structures', async () => {
      const bus = new MessageBus<NodeCommands>();
      const handler = vi
        .fn()
        .mockImplementation(() => ({ status: 'accepted' as const }));
      bus.handleCommand('CreateNode', handler);

      // Create a Map and convert it to a serializable object
      const nodeMap = new Map<string, BaseNodeOperation>();
      nodeMap.set('node1', { id: 'node1', type: 'RECTANGLE' });
      nodeMap.set('node2', { id: 'node2', type: 'ELLIPSE' });

      const serializableNode: NodeOperation = {
        id: 'map-container',
        type: 'GROUP',
        children: Array.from(nodeMap.values()),
      };

      const result = await bus.sendCommand('CreateNode', serializableNode);
      expect(result.status).toBe('accepted');
      expect(handler).toHaveBeenCalledWith(serializableNode);
    });
  });

  describe('Deep Cloning', () => {
    it('should handle deep cloning of complex objects', async () => {
      const bus = new MessageBus<NodeCommands>();
      const handler = vi.fn().mockImplementation((data: NodeOperation) => {
        // Modify the input data to ensure we're working with a clone
        if (data.children) {
          data.children[0].id = 'modified';
        }
        return { status: 'accepted' as const };
      });

      bus.handleCommand('CreateNode', handler);

      const originalNode: NodeOperation = {
        id: 'original',
        type: 'GROUP',
        children: [
          { id: 'child1', type: 'RECTANGLE' },
          { id: 'child2', type: 'ELLIPSE' },
        ],
      };

      const result = await bus.sendCommand('CreateNode', originalNode);
      expect(result.status).toBe('accepted');
      // Original should not be modified
      expect(originalNode.children?.[0].id).toBe('child1');
    });
  });
});
