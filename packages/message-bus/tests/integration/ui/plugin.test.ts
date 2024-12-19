import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createTestBus,
  createValidationError,
  generateUUID,
} from '../../utils/helpers';
import type { TodoCommands, TodoEvents } from '../../utils/types';

describe('Plugin-UI Communication', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Command Flow', () => {
    it('should send commands from UI to plugin', async () => {
      const { bus } = createTestBus<TodoCommands, TodoEvents>();
      const handler = vi.fn().mockResolvedValue({
        status: 'accepted',
      });

      // Setup handler in "plugin" context
      bus.handleCommand('AddTodo', handler);

      // Send command from "UI" context
      await bus.sendCommand('AddTodo', {
        text: 'New todo',
      });

      expect(handler).toHaveBeenCalledWith({
        text: 'New todo',
      });
    });

    it('should handle command responses', async () => {
      const { bus } = createTestBus<TodoCommands, TodoEvents>();
      const handler = vi.fn().mockResolvedValue({
        status: 'accepted',
        message: 'Todo added',
      });

      bus.handleCommand('AddTodo', handler);
      const response = await bus.sendCommand('AddTodo', {
        text: 'New todo',
      });

      expect(response).toEqual({
        status: 'accepted',
        message: 'Todo added',
      });
    });
  });

  describe('Event Flow', () => {
    it('should broadcast events from plugin to UI', () => {
      const { bus } = createTestBus<TodoCommands, TodoEvents>();
      const listener = vi.fn();

      // Setup listener in "UI" context
      bus.listenToEvent('TodoAdded', listener);

      // Publish event from "plugin" context
      const todo = {
        id: generateUUID(),
        text: 'New todo',
        completed: false,
      };
      bus.publishEvent('TodoAdded', todo);

      expect(listener).toHaveBeenCalledWith(todo);
    });

    it('should handle multiple UI listeners', () => {
      const { bus } = createTestBus<TodoCommands, TodoEvents>();
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      bus.listenToEvent('TodoAdded', listener1);
      bus.listenToEvent('TodoAdded', listener2);

      const todo = {
        id: generateUUID(),
        text: 'New todo',
        completed: false,
      };
      bus.publishEvent('TodoAdded', todo);

      expect(listener1).toHaveBeenCalledWith(todo);
      expect(listener2).toHaveBeenCalledWith(todo);
    });
  });

  describe('Error Handling', () => {
    it('should propagate errors to UI', async () => {
      const { bus } = createTestBus<TodoCommands, TodoEvents>();
      const handler = vi.fn().mockRejectedValue(new Error('Network error'));

      bus.handleCommand('AddTodo', handler);
      const response = await bus.sendCommand('AddTodo', {
        text: 'New todo',
      });

      expect(response.status).toBe('rejected');
      expect(response.message).toContain('Network error');
    });

    it('should handle validation errors', async () => {
      const { bus } = createTestBus<TodoCommands, TodoEvents>();
      const error = createValidationError('text', 'String must not be empty');

      // Mock validation error response
      bus.mockCommandResponse('AddTodo', {
        status: 'rejected',
        message: 'Invalid todo data',
        errors: [error],
      });

      const response = await bus.sendCommand('AddTodo', {
        text: '', // Invalid: empty string
      });

      expect(response).toEqual({
        status: 'rejected',
        message: 'Invalid todo data',
        errors: [error],
      });
    });
  });
});
