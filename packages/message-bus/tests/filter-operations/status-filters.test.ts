import type { JsonObject, JsonValue } from 'type-fest';
import { describe, expect, it, vi } from 'vitest';
import { MessageBus } from '../../src';
import { createMockListener } from '../utils/helpers';

interface Todo extends JsonObject {
  id: string;
  text: string;
  completed: boolean;
  [key: string]: JsonValue;
}

interface TodoCommands {
  AddTodo: Todo;
  ToggleTodo: { id: string; [key: string]: JsonValue };
  [key: string]: JsonObject;
}

interface TodoEvents {
  TodoAdded: Todo;
  TodoToggled: Todo;
  TodoFiltered: Todo[];
  [key: string]: JsonObject;
}

describe('Status Filters', () => {
  describe('Filter by Completion', () => {
    it('should filter completed todos', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoFiltered', listener);

      const todos = [
        { id: '1', text: 'Task 1', completed: true },
        { id: '2', text: 'Task 2', completed: false },
        { id: '3', text: 'Task 3', completed: true },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Filter completed todos
      const completedTodos = todos.filter((todo) => todo.completed);
      bus.publishEvent('TodoFiltered', completedTodos);

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: '1', completed: true }),
          expect.objectContaining({ id: '3', completed: true }),
        ]),
      );
      expect(listener).toHaveBeenCalledWith(
        expect.not.arrayContaining([
          expect.objectContaining({ id: '2', completed: false }),
        ]),
      );
    });

    it('should filter active todos', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoFiltered', listener);

      const todos = [
        { id: '1', text: 'Task 1', completed: true },
        { id: '2', text: 'Task 2', completed: false },
        { id: '3', text: 'Task 3', completed: false },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Filter active todos
      const activeTodos = todos.filter((todo) => !todo.completed);
      bus.publishEvent('TodoFiltered', activeTodos);

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: '2', completed: false }),
          expect.objectContaining({ id: '3', completed: false }),
        ]),
      );
      expect(listener).toHaveBeenCalledWith(
        expect.not.arrayContaining([
          expect.objectContaining({ id: '1', completed: true }),
        ]),
      );
    });

    it('should handle empty results', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoFiltered', listener);

      const todos = [
        { id: '1', text: 'Task 1', completed: true },
        { id: '2', text: 'Task 2', completed: true },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Filter active todos (should be empty)
      const activeTodos = todos.filter((todo) => !todo.completed);
      bus.publishEvent('TodoFiltered', activeTodos);

      expect(listener).toHaveBeenCalledWith([]);
    });

    it('should preserve filter on updates', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoFiltered', listener);

      const todos = [
        { id: '1', text: 'Task 1', completed: false },
        { id: '2', text: 'Task 2', completed: false },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Initial filter of active todos
      const activeTodos = todos.filter((todo) => !todo.completed);
      bus.publishEvent('TodoFiltered', activeTodos);

      // Toggle one todo to completed
      await bus.sendCommand('ToggleTodo', { id: '1' });
      todos[0].completed = true;

      // Update filter
      const updatedActiveTodos = todos.filter((todo) => !todo.completed);
      bus.publishEvent('TodoFiltered', updatedActiveTodos);

      // Should only contain the remaining active todo
      expect(listener).toHaveBeenLastCalledWith([
        expect.objectContaining({ id: '2', completed: false }),
      ]);
    });
  });
});
