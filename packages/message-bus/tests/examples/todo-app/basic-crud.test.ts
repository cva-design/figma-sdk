import { describe, expect, it, vi } from 'vitest';
import type {
  TodoCommands,
  TodoEvents,
} from '../../../docs/todo-app-example/types';
import { TodoEventNames } from '../../../docs/todo-app-example/types';
import { createTestBus } from '../../utils/helpers';

describe('Todo App - Basic CRUD', () => {
  // This test suite demonstrates the basic patterns for testing a message bus application:
  // 1. Create a test bus instance
  // 2. Set up event listeners to verify events are published
  // 3. Set up command handlers to simulate backend behavior
  // 4. Send commands and verify the responses
  // 5. Verify that appropriate events were published

  it('should handle add todo', async () => {
    // Create a test bus instance with our command and event types
    const { bus } = createTestBus<TodoCommands, TodoEvents>();

    // Set up an event listener to verify the TodoAdded event is published
    const eventListener = vi.fn();
    bus.listenToEvent(TodoEventNames.TodoAdded, eventListener);

    // Set up a command handler that simulates the backend behavior
    const handler = vi.fn().mockImplementation((data) => {
      const todo = {
        id: '123',
        text: data.text,
        completed: data.completed ?? false,
      };
      bus.publishEvent(TodoEventNames.TodoAdded, todo);
      return { status: 'accepted', message: 'Todo added successfully' };
    });
    bus.handleCommand('AddTodo', handler);

    // Send the command and verify the response
    const response = await bus.sendCommand('AddTodo', { text: 'New todo' });

    // Verify the command was successful
    expect(response.status).toBe('accepted');
    expect(response.message).toBe('Todo added successfully');

    // Verify the event was published with the correct data
    expect(eventListener).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'New todo',
        completed: false,
      }),
    );
  });

  it('should handle get todos', async () => {
    const { bus } = createTestBus<TodoCommands, TodoEvents>();
    const eventListener = vi.fn();
    bus.listenToEvent(TodoEventNames.TodosLoaded, eventListener);

    const todos = [
      { id: '123', text: 'Todo 1', completed: false },
      { id: '456', text: 'Todo 2', completed: true },
    ];

    const handler = vi.fn().mockImplementation(() => {
      bus.publishEvent(TodoEventNames.TodosLoaded, { todos });
      return { status: 'accepted' };
    });
    bus.handleCommand('GetTodos', handler);

    const response = await bus.sendCommand('GetTodos', null);

    expect(response.status).toBe('accepted');
    expect(eventListener).toHaveBeenCalledWith({ todos });
  });

  it('should handle update todo', async () => {
    const { bus } = createTestBus<TodoCommands, TodoEvents>();
    const eventListener = vi.fn();
    bus.listenToEvent(TodoEventNames.TodoUpdated, eventListener);

    const handler = vi.fn().mockImplementation((data) => {
      const todo = {
        id: data.id,
        text: 'Original',
        completed: data.completed ?? false,
      };
      bus.publishEvent(TodoEventNames.TodoUpdated, todo);
      return { status: 'accepted', message: 'Todo updated successfully' };
    });
    bus.handleCommand('UpdateTodo', handler);

    const response = await bus.sendCommand('UpdateTodo', {
      id: '123',
      completed: true,
    });

    expect(response.status).toBe('accepted');
    expect(response.message).toBe('Todo updated successfully');
    expect(eventListener).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '123',
        completed: true,
      }),
    );
  });

  it('should handle delete todo', async () => {
    const { bus } = createTestBus<TodoCommands, TodoEvents>();
    const eventListener = vi.fn();
    bus.listenToEvent(TodoEventNames.TodoDeleted, eventListener);

    const handler = vi.fn().mockImplementation((data) => {
      bus.publishEvent(TodoEventNames.TodoDeleted, { id: data.id });
      return { status: 'accepted', message: 'Todo deleted successfully' };
    });
    bus.handleCommand('DeleteTodo', handler);

    const response = await bus.sendCommand('DeleteTodo', { id: '123' });

    expect(response.status).toBe('accepted');
    expect(response.message).toBe('Todo deleted successfully');
    expect(eventListener).toHaveBeenCalledWith({ id: '123' });
  });
});
