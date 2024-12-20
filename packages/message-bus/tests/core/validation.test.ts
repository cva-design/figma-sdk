import { describe, expect, it, vi } from 'vitest';
import {
  createTestBus,
  createValidationError,
  generateUUID,
} from '../utils/helpers';
import type { TodoCommands, TodoEvents } from '../utils/types';

describe('Validation', () => {
  describe('Todo App', () => {
    describe('Commands', () => {
      it('should validate AddTodo command', async () => {
        const { bus } = createTestBus<TodoCommands, TodoEvents>();
        const handler = vi.fn();
        bus.handleCommand('AddTodo', handler);

        // Mock validation error response
        bus.mockCommandResponse('AddTodo', {
          status: 'rejected',
          message: 'Invalid todo data',
          errors: [createValidationError('text', 'String must not be empty')],
        });

        // Test empty text
        const emptyTextResponse = await bus.sendCommand('AddTodo', {
          text: '',
        });
        expect(emptyTextResponse.status).toBe('rejected');
        expect(emptyTextResponse.errors[0]).toEqual(
          createValidationError('text', 'String must not be empty'),
        );
        expect(handler).not.toHaveBeenCalled();

        // Mock validation error response for long text
        bus.mockCommandResponse('AddTodo', {
          status: 'rejected',
          message: 'Invalid todo data',
          errors: [
            createValidationError(
              'text',
              'String must not exceed 100 characters',
            ),
          ],
        });

        // Test text too long
        const longTextResponse = await bus.sendCommand('AddTodo', {
          text: 'x'.repeat(101), // Max length is 100
        });
        expect(longTextResponse.status).toBe('rejected');
        expect(longTextResponse.errors[0]).toEqual(
          createValidationError(
            'text',
            'String must not exceed 100 characters',
          ),
        );
        expect(handler).not.toHaveBeenCalled();

        // Mock success response
        bus.mockCommandResponse('AddTodo', {
          status: 'accepted',
          message: 'Todo added successfully',
        });

        // Test valid command
        const validResponse = await bus.sendCommand('AddTodo', {
          text: 'Valid todo',
          completed: false,
        });
        expect(validResponse.status).toBe('accepted');
      });

      it('should validate UpdateTodo command', async () => {
        const { bus } = createTestBus<TodoCommands, TodoEvents>();
        const handler = vi.fn();
        bus.handleCommand('UpdateTodo', handler);

        // Mock validation error response
        bus.mockCommandResponse('UpdateTodo', {
          status: 'rejected',
          message: 'Invalid update data',
          errors: [createValidationError('id', 'Invalid UUID format')],
        });

        // Test invalid UUID
        const invalidUUIDResponse = await bus.sendCommand('UpdateTodo', {
          id: 'not-a-uuid',
          text: 'Valid text',
        });
        expect(invalidUUIDResponse.status).toBe('rejected');
        expect(invalidUUIDResponse.errors[0]).toEqual(
          createValidationError('id', 'Invalid UUID format'),
        );
        expect(handler).not.toHaveBeenCalled();

        // Mock success response
        bus.mockCommandResponse('UpdateTodo', {
          status: 'accepted',
          message: 'Todo updated successfully',
        });

        // Test valid command
        const validResponse = await bus.sendCommand('UpdateTodo', {
          id: generateUUID(),
          text: 'Valid update',
          completed: true,
        });
        expect(validResponse.status).toBe('accepted');
      });
    });

    describe('Events', () => {
      it('should validate TodoAdded event', () => {
        const { bus } = createTestBus<TodoCommands, TodoEvents>();
        const listener = vi.fn();
        bus.listenToEvent('TodoAdded', listener);

        // Mock event validation to reject invalid events
        bus.mockEventValidation('TodoAdded', (event: any) => {
          if (typeof event.id !== 'string' ||
              !event.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) ||
              typeof event.text !== 'string' ||
              event.text.length === 0 ||
              typeof event.completed !== 'boolean') {
            throw new Error('Invalid event data');
          }
          return true;
        });

        // Invalid event should throw and not trigger listener
        expect(() => {
          bus.publishEvent('TodoAdded', {
            id: 'not-a-uuid',
            text: '',
            completed: 'not-a-boolean' as any,
          });
        }).toThrow('Invalid event data');
        expect(listener).not.toHaveBeenCalled();

        // Valid event
        const validEvent = {
          id: generateUUID(),
          text: 'Valid todo',
          completed: false,
        };
        bus.publishEvent('TodoAdded', validEvent);
        expect(listener).toHaveBeenCalledWith(validEvent);
      });
    });
  });

  describe('Complex Validations', () => {
    it('should validate array constraints', async () => {
      const { bus } = createTestBus<{}, TodoEvents>();
      const listener = vi.fn();
      bus.listenToEvent('TodosLoaded', listener);

      // Mock event validation with stricter validation
      bus.mockEventValidation('TodosLoaded', (event: any) => {
        if (!Array.isArray(event.todos)) {
          throw new Error('Invalid todos array');
        }
        const isValid = event.todos.every(
          (todo: any) =>
            typeof todo.id === 'string' &&
            todo.id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/) !== null &&
            typeof todo.text === 'string' &&
            todo.text.length > 0 &&
            typeof todo.completed === 'boolean'
        );
        if (!isValid) {
          throw new Error('Invalid todo item in array');
        }
        return true;
      });

      // Empty array is valid
      const validEmpty = { todos: [] };
      bus.publishEvent('TodosLoaded', validEmpty);
      expect(listener).toHaveBeenCalledWith(validEmpty);

      // Invalid items in array - should throw and not trigger listener
      expect(() => {
        bus.publishEvent('TodosLoaded', {
          todos: [
            {
              id: 'not-a-uuid',
              text: '',
              completed: 'not-a-boolean' as any,
            },
          ],
        });
      }).toThrow('Invalid todo item in array');
      expect(listener).toHaveBeenCalledTimes(1); // Only the first call should succeed

      // Valid array with items
      const validItems = {
        todos: [
          {
            id: generateUUID(),
            text: 'Valid todo',
            completed: false,
          },
        ],
      };
      bus.publishEvent('TodosLoaded', validItems);
      expect(listener).toHaveBeenCalledWith(validItems);
      expect(listener).toHaveBeenCalledTimes(2); // Only valid events should trigger listener
    });
  });
});
