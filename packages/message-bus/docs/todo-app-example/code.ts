import { getMessageBus } from '@figma-plugin-sdk/message-bus';
import type { Todo, TodoCommands, TodoEvents } from './types';

// Create message bus instance
const messageBus = getMessageBus<TodoCommands, TodoEvents>();

// In-memory storage for this example
const todos = new Map<string, Todo>();

// Command Handlers
messageBus.handleCommand('AddTodo', ({ text, completed = false }) => {
  try {
    const id = Math.random().toString(36).slice(2);
    const todo = { id, text, completed };
    todos.set(id, todo);
    messageBus.publishEvent('TodoAdded', todo);
  } catch (error) {
    messageBus.publishEvent('TodoError', {
      message: error.message,
      command: 'AddTodo',
    });
  }
});

messageBus.handleCommand('GetTodos', () => {
  try {
    messageBus.publishEvent('TodosLoaded', {
      todos: Array.from(todos.values()),
    });
  } catch (error) {
    messageBus.publishEvent('TodoError', {
      message: error.message,
      command: 'GetTodos',
    });
  }
});

messageBus.handleCommand('UpdateTodo', ({ id, ...updates }) => {
  try {
    const todo = todos.get(id);
    if (!todo) throw new Error(`Todo ${id} not found`);

    const updatedTodo = { ...todo, ...updates };
    todos.set(id, updatedTodo);
    messageBus.publishEvent('TodoUpdated', updatedTodo);
  } catch (error) {
    messageBus.publishEvent('TodoError', {
      message: error.message,
      command: 'UpdateTodo',
    });
  }
});

messageBus.handleCommand('DeleteTodo', ({ id }) => {
  try {
    if (!todos.delete(id)) {
      throw new Error(`Todo ${id} not found`);
    }
    messageBus.publishEvent('TodoDeleted', { id });
  } catch (error) {
    messageBus.publishEvent('TodoError', {
      message: error.message,
      command: 'DeleteTodo',
    });
  }
});
