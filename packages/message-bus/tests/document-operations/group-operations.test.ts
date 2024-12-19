import type { JsonObject, JsonValue } from 'type-fest';
import { describe, expect, it, vi } from 'vitest';
import { MessageBus } from '../../src';
import { createTestBus, createMockListener } from '../utils/helpers';

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
interface CreateGroupCommand extends JsonObject {
  nodes: Node[];
}

interface AddToGroupCommand extends JsonObject {
  groupId: string;
  nodes: Node[];
}

interface RemoveFromGroupCommand extends JsonObject {
  groupId: string;
  nodeIds: string[];
}

interface NodeCommands {
  CreateGroup: CreateGroupCommand;
  AddToGroup: AddToGroupCommand;
  RemoveFromGroup: RemoveFromGroupCommand;
  [key: string]: JsonObject;
}

// Event interfaces
interface NodesGroupedEvent extends JsonObject {
  group: Node;
  nodes: Node[];
}

interface NodesUngroupedEvent extends JsonObject {
  groupId: string;
  nodes: Node[];
}

interface NodeEvents {
  GroupCreated: Node;
  GroupUpdated: Node;
  NodesGrouped: NodesGroupedEvent;
  NodesUngrouped: NodesUngroupedEvent;
  [key: string]: JsonObject;
}

describe('Group Operations', () => {
  describe('Group Management', () => {
    it('should create groups', async () => {
      const { bus } = createTestBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('GroupCreated', listener);

      const nodes = [
        { id: 'node1', type: 'RECTANGLE' },
        { id: 'node2', type: 'ELLIPSE' }
      ];

      const handler = vi.fn().mockImplementation((data) => {
        const group = {
          id: 'group1',
          type: 'GROUP',
          children: data.nodes
        };
        bus.publishEvent('GroupCreated', group);
        return { status: 'accepted' as const };
      });

      bus.handleCommand('CreateGroup', handler);
      const result = await bus.sendCommand('CreateGroup', { nodes });

      expect(result.status).toBe('accepted');
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'group1',
          type: 'GROUP',
          children: nodes
        })
      );
    });

    it('should add nodes to groups', async () => {
      const { bus } = createTestBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('NodesGrouped', listener);

      const groupId = 'group1';
      const nodes = [
        { id: 'node3', type: 'RECTANGLE' },
        { id: 'node4', type: 'ELLIPSE' }
      ];

      const handler = vi.fn().mockImplementation((data) => {
        const event = {
          group: { id: data.groupId, type: 'GROUP', children: data.nodes },
          nodes: data.nodes
        };
        bus.publishEvent('NodesGrouped', event);
        return { status: 'accepted' as const };
      });

      bus.handleCommand('AddToGroup', handler);
      const result = await bus.sendCommand('AddToGroup', { groupId, nodes });

      expect(result.status).toBe('accepted');
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          group: expect.objectContaining({ id: groupId }),
          nodes
        })
      );
    });

    it('should handle group hierarchy', async () => {
      const { bus } = createTestBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('GroupHierarchyChanged', listener);

      const parentGroup = { id: 'parent', type: 'GROUP' };
      const childGroup = { id: 'child', type: 'GROUP' };

      const handler = vi.fn().mockImplementation(() => {
        bus.publishEvent('GroupHierarchyChanged', {
          parent: parentGroup,
          child: childGroup
        });
        return { status: 'accepted' as const };
      });

      bus.handleCommand('UpdateGroupHierarchy', handler);
      const result = await bus.sendCommand('UpdateGroupHierarchy', {
        parentId: parentGroup.id,
        childId: childGroup.id
      });

      expect(result.status).toBe('accepted');
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          parent: parentGroup,
          child: childGroup
        })
      );
    });

    it('should validate group contents', async () => {
      const { bus } = createTestBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('GroupValidated', listener);

      const group = {
        id: 'group1',
        type: 'GROUP',
        children: [
          { id: 'node1', type: 'RECTANGLE' },
          { id: 'node2', type: 'ELLIPSE' }
        ]
      };

      const handler = vi.fn().mockImplementation(() => {
        bus.publishEvent('GroupValidated', { group, isValid: true });
        return { status: 'accepted' as const };
      });

      bus.handleCommand('ValidateGroup', handler);
      const result = await bus.sendCommand('ValidateGroup', { groupId: group.id });

      expect(result.status).toBe('accepted');
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          group,
          isValid: true
        })
      );
    });

    it('should handle node removal from groups', async () => {
      const { bus } = createTestBus<NodeCommands, NodeEvents>();
      const listener = createMockListener();
      bus.listenToEvent('NodesUngrouped', listener);

      const groupId = 'group1';
      const nodeIds = ['node1', 'node2'];

      const handler = vi.fn().mockImplementation((data) => {
        const nodes = data.nodeIds.map(id => ({ id, type: 'RECTANGLE' }));
        bus.publishEvent('NodesUngrouped', {
          groupId: data.groupId,
          nodes
        });
        return { status: 'accepted' as const };
      });

      bus.handleCommand('RemoveFromGroup', handler);
      const result = await bus.sendCommand('RemoveFromGroup', { groupId, nodeIds });

      expect(result.status).toBe('accepted');
      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          groupId,
          nodes: expect.arrayContaining([
            expect.objectContaining({ id: nodeIds[0] }),
            expect.objectContaining({ id: nodeIds[1] })
          ])
        })
      );
    });
  });
});
