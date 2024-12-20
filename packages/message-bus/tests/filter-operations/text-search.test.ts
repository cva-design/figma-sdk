import type { JsonObject } from 'type-fest';
import { describe, expect, it } from 'vitest';
import { MessageBus } from '../../src';
import { createMockListener } from '../utils/helpers';

interface Todo extends JsonObject {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoCommands {
  AddTodo: Todo;
  UpdateTodo: Todo;
}

interface TodoEvents {
  TodoAdded: Todo;
  TodoUpdated: Todo;
  TodoSearched: Todo[];
}

describe('Text Search', () => {
  describe('Search Functionality', () => {
    it('should find matching todos', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoSearched', listener);

      const todos = [
        { id: '1', text: 'Buy groceries', completed: false },
        { id: '2', text: 'Clean house', completed: false },
        { id: '3', text: 'Buy milk', completed: false },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Search for todos containing 'buy'
      const searchResults = todos.filter((todo) =>
        todo.text.toLowerCase().includes('buy'),
      );
      bus.publishEvent('TodoSearched', searchResults);

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: '1', text: 'Buy groceries' }),
          expect.objectContaining({ id: '3', text: 'Buy milk' }),
        ]),
      );
      expect(listener).toHaveBeenCalledWith(
        expect.not.arrayContaining([
          expect.objectContaining({ id: '2', text: 'Clean house' }),
        ]),
      );
    });

    it('should handle case sensitivity', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoSearched', listener);

      const todos = [
        { id: '1', text: 'Buy GROCERIES', completed: false },
        { id: '2', text: 'buy milk', completed: false },
        { id: '3', text: 'BUY bread', completed: false },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Search case-insensitively
      const searchResults = todos.filter((todo) =>
        todo.text.toLowerCase().includes('buy'),
      );
      bus.publishEvent('TodoSearched', searchResults);

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: '1' }),
          expect.objectContaining({ id: '2' }),
          expect.objectContaining({ id: '3' }),
        ]),
      );
    });

    it('should handle empty search', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoSearched', listener);

      const todos = [
        { id: '1', text: 'Buy groceries', completed: false },
        { id: '2', text: 'Clean house', completed: false },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Empty search should return all todos
      bus.publishEvent('TodoSearched', todos);

      expect(listener).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: '1' }),
          expect.objectContaining({ id: '2' }),
        ]),
      );
    });

    it('should update results on todo changes', async () => {
      const bus = new MessageBus<TodoCommands, TodoEvents>();
      const listener = createMockListener();
      bus.listenToEvent('TodoSearched', listener);

      const todos = [
        { id: '1', text: 'Buy groceries', completed: false },
        { id: '2', text: 'Clean house', completed: false },
      ];

      // Add all todos
      for (const todo of todos) {
        await bus.sendCommand('AddTodo', todo);
      }

      // Initial search for 'buy'
      let searchResults = todos.filter((todo) =>
        todo.text.toLowerCase().includes('buy'),
      );
      bus.publishEvent('TodoSearched', searchResults);

      // Update a todo to match the search
      const updatedTodo = { ...todos[1], text: 'Buy milk' };
      await bus.sendCommand('UpdateTodo', updatedTodo);
      todos[1] = updatedTodo;

      // Search again
      searchResults = todos.filter((todo) =>
        todo.text.toLowerCase().includes('buy'),
      );
      bus.publishEvent('TodoSearched', searchResults);

      // Should now include both todos
      expect(listener).toHaveBeenLastCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ id: '1', text: 'Buy groceries' }),
          expect.objectContaining({ id: '2', text: 'Buy milk' }),
        ]),
      );
    });
  });
});
