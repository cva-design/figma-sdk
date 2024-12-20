import type { JsonObject } from 'type-fest';
import { describe, expect, it } from 'vitest';
import { MessageBus } from '#source';
import { createMockListener } from '../utils/helpers';

// Base interface for node properties
interface NodeBase {
  id: string;
  type: string;
  children?: Node[];
  parent?: string;
}

// Node type that extends both NodeBase and JsonObject
type Node = NodeBase & JsonObject;

// Command interfaces
interface CreateNodeCommand {
  id: string;
  type: string;
  children?: Node[];
  parent?: string;
}

interface AddChildCommand {
  parentId: string;
  child: Node;
}

interface MoveNodeCommand {
  nodeId: string;
  newParentId: string;
}

interface NodeCommands {
  CreateNode: CreateNodeCommand;
  AddChild: AddChildCommand;
  MoveNode: MoveNodeCommand;
}

// Event interfaces
interface NodeMovedEvent {
  node: Node;
  oldParentId?: string;
  newParentId: string;
}

interface NodeEvents {
  NodeCreated: Node;
  NodeUpdated: Node;
  NodeMoved: NodeMovedEvent;
}

describe('Nested Operations', () => {
  describe('Node Creation', () => {
    it('should create parent-child relationships', async () => {
      const bus = new MessageBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('NodeCreated', listener);

      const parent: Node = {
        id: 'parent',
        type: 'FRAME',
        children: [],
      };

      const child: Node = {
        id: 'child',
        type: 'RECTANGLE',
        parent: 'parent',
      };

      // Handle CreateNode command
      bus.handleCommand('CreateNode', (node: any) => {
        bus.publishEvent('NodeCreated', node);
        return Promise.resolve({ status: 'accepted' as const });
      });

      // Handle AddChild command
      bus.handleCommand('AddChild', ({ parentId, child }: any) => {
        bus.publishEvent('NodeCreated', {
          ...child,
          parent: parentId,
        });
        return Promise.resolve({ status: 'accepted' as const });
      });

      await bus.sendCommand('CreateNode', parent);
      await bus.sendCommand('AddChild', { parentId: parent.id, child });

      expect(listener).toHaveBeenCalledWith(parent);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          ...child,
          parent: parent.id,
        }),
      );
    });

    it('should handle multiple nesting levels', async () => {
      const bus = new MessageBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('NodeCreated', listener);

      const root: Node = {
        id: 'root',
        type: 'FRAME',
        children: [],
      };

      const parent: Node = {
        id: 'parent',
        type: 'GROUP',
        parent: 'root',
        children: [],
      };

      const child: Node = {
        id: 'child',
        type: 'RECTANGLE',
        parent: 'parent',
      };

      // Handle CreateNode command
      bus.handleCommand('CreateNode', (node: any) => {
        bus.publishEvent('NodeCreated', node);
        return Promise.resolve({ status: 'accepted' as const });
      });

      // Handle AddChild command
      bus.handleCommand('AddChild', ({ parentId, child }: any) => {
        bus.publishEvent('NodeCreated', {
          ...child,
          parent: parentId,
        });
        return Promise.resolve({ status: 'accepted' as const });
      });

      await bus.sendCommand('CreateNode', root);
      await bus.sendCommand('AddChild', { parentId: root.id, child: parent });
      await bus.sendCommand('AddChild', { parentId: parent.id, child });

      expect(listener).toHaveBeenCalledWith(root);
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          ...parent,
          parent: root.id,
        }),
      );
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          ...child,
          parent: parent.id,
        }),
      );
    });

    it('should validate node types', async () => {
      const bus = new MessageBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('NodeCreated', listener);

      const invalidNode: Node = {
        id: 'invalid',
        type: 'INVALID_TYPE',
        children: [],
      };

      // Handle CreateNode command with validation
      bus.handleCommand('CreateNode', (node: any) => {
        const validTypes = ['FRAME', 'GROUP', 'RECTANGLE', 'ELLIPSE', 'TEXT'];
        if (!validTypes.includes(node.type)) {
          return {
            status: 'rejected' as const,
            message: `Invalid node type: ${node.type}`,
          };
        }
        bus.publishEvent('NodeCreated', node);
        return Promise.resolve({ status: 'accepted' as const });
      });

      const result = await bus.sendCommand('CreateNode', invalidNode);
      expect(result.status).toBe('rejected');
      expect(listener).not.toHaveBeenCalled();
    });

    it('should preserve creation order', async () => {
      const bus = new MessageBus<NodeCommands, NodeEvents>();
      const createdNodes: Node[] = [];
      bus.listenToEvent('NodeCreated', (node: any) => {
        createdNodes.push(node);
      });

      const parent: Node = {
        id: 'parent',
        type: 'FRAME',
        children: [],
      };

      const children: Node[] = Array(5)
        .fill(0)
        .map((_, i) => ({
          id: `child-${i}`,
          type: 'RECTANGLE',
          parent: 'parent',
        }));

      // Handle CreateNode command
      bus.handleCommand('CreateNode', (node: any) => {
        bus.publishEvent('NodeCreated', node);
        return Promise.resolve({ status: 'accepted' as const });
      });

      // Handle AddChild command
      bus.handleCommand('AddChild', ({ parentId, child }: any) => {
        bus.publishEvent('NodeCreated', {
          ...child,
          parent: parentId,
        });
        return Promise.resolve({ status: 'accepted' as const });
      });

      await bus.sendCommand('CreateNode', parent);
      await Promise.all(
        children.map((child) =>
          bus.sendCommand('AddChild', { parentId: parent.id, child }),
        ),
      );

      // First node should be the parent
      expect(createdNodes[0]).toEqual(parent);

      // Children should be created in order
      children.forEach((child, i) => {
        expect(createdNodes[i + 1]).toEqual(
          expect.objectContaining({
            ...child,
            parent: parent.id,
          }),
        );
      });
    });

    it('should handle node movement', async () => {
      const bus = new MessageBus<NodeCommands, NodeEvents>();
      const moveListener = createMockListener();
      bus.listenToEvent('NodeMoved', moveListener);

      const root: Node = {
        id: 'root',
        type: 'FRAME',
        children: [],
      };

      const parent1: Node = {
        id: 'parent1',
        type: 'GROUP',
        parent: 'root',
        children: [],
      };

      const parent2: Node = {
        id: 'parent2',
        type: 'GROUP',
        parent: 'root',
        children: [],
      };

      const child: Node = {
        id: 'child',
        type: 'RECTANGLE',
        parent: 'parent1',
      };

      // Handle CreateNode command
      bus.handleCommand('CreateNode', (node: any) => {
        bus.publishEvent('NodeCreated', node);
        return Promise.resolve({ status: 'accepted' as const });
      });

      // Handle AddChild command
      bus.handleCommand('AddChild', ({ parentId, child }: any) => {
        bus.publishEvent('NodeCreated', {
          ...child,
          parent: parentId,
        });
        return Promise.resolve({ status: 'accepted' as const });
      });

      // Handle MoveNode command
      bus.handleCommand('MoveNode', ({ nodeId, newParentId }: any) => {
        const movedNode = {
          ...child,
          parent: newParentId,
        };
        bus.publishEvent('NodeMoved', {
          node: movedNode,
          oldParentId: child.parent,
          newParentId,
        });
        return Promise.resolve({ status: 'accepted' as const });
      });

      // Create initial structure
      await bus.sendCommand('CreateNode', root);
      await bus.sendCommand('AddChild', { parentId: root.id, child: parent1 });
      await bus.sendCommand('AddChild', { parentId: root.id, child: parent2 });
      await bus.sendCommand('AddChild', { parentId: parent1.id, child });

      // Move child from parent1 to parent2
      await bus.sendCommand('MoveNode', {
        nodeId: child.id,
        newParentId: parent2.id,
      });

      expect(moveListener).toHaveBeenCalledWith({
        node: expect.objectContaining({
          ...child,
          parent: parent2.id,
        }),
        oldParentId: parent1.id,
        newParentId: parent2.id,
      });
    });
  });
});
