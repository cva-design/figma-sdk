// @filename: code.ts
// Note: This is example code. In a real project, you would import from your installed package
import { getMessageBus } from '@figma-plugin-sdk/message-bus';
import type { Todo, TodoCommands, TodoEvents } from './types';
import { TodoEventNames } from './types';

// Create message bus instance for our todo app
// The type parameters ensure type safety for our commands and events
const messageBus = getMessageBus<TodoCommands, TodoEvents>();

// In-memory storage for this example
const todos = new Map<string, Todo>();

// Command Handlers
// Each handler is responsible for:
// 1. Processing the command
// 2. Publishing relevant events
// 3. Returning a response

messageBus.handleCommand('AddTodo', (data) => {
  const id = Math.random().toString(36).slice(2);
  const todo = { id, text: data.text, completed: data.completed ?? false };

  todos.set(id, todo);
  messageBus.publishEvent(TodoEventNames.TodoAdded, todo);

  return { status: 'accepted', message: 'Todo added successfully' };
});

messageBus.handleCommand('GetTodos', () => {
  const todoList = Array.from(todos.values());
  messageBus.publishEvent(TodoEventNames.TodosLoaded, { todos: todoList });
  return { status: 'accepted' };
});

messageBus.handleCommand('UpdateTodo', (data) => {
  const todo = todos.get(data.id);
  if (!todo) {
    return { status: 'rejected', message: 'Todo not found' };
  }

  const updatedTodo = { ...todo, ...data };
  todos.set(data.id, updatedTodo);
  messageBus.publishEvent(TodoEventNames.TodoUpdated, updatedTodo);

  return { status: 'accepted', message: 'Todo updated successfully' };
});

messageBus.handleCommand('DeleteTodo', (data) => {
  if (!todos.delete(data.id)) {
    return { status: 'rejected', message: 'Todo not found' };
  }

  messageBus.publishEvent(TodoEventNames.TodoDeleted, { id: data.id });
  return { status: 'accepted', message: 'Todo deleted successfully' };
});
