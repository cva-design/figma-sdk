import { getMessageBus } from '@figma-plugin-sdk/message-bus';
import type { TodoCommands, TodoEvents } from './types';

const messageBus = getMessageBus<TodoCommands, TodoEvents>();

// UI State
let todos = [];

// Event Listeners
messageBus.listenToEvent('TodosLoaded', ({ todos: loadedTodos }) => {
  todos = loadedTodos;
  renderTodos();
});

messageBus.listenToEvent('TodoAdded', (todo) => {
  todos.push(todo);
  renderTodos();
});

messageBus.listenToEvent('TodoUpdated', (updatedTodo) => {
  const index = todos.findIndex((t) => t.id === updatedTodo.id);
  if (index !== -1) {
    todos[index] = updatedTodo;
    renderTodos();
  }
});

messageBus.listenToEvent('TodoDeleted', ({ id }) => {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
});

messageBus.listenToEvent('TodoError', ({ message }) => {
  console.error('Todo Error:', message);
  // Show error in UI
});

// UI Actions
function addTodo(text: string) {
  messageBus.sendCommand('AddTodo', { text });
}

function toggleTodo(id: string, completed: boolean) {
  messageBus.sendCommand('UpdateTodo', { id, completed });
}

function deleteTodo(id: string) {
  messageBus.sendCommand('DeleteTodo', { id });
}

function loadTodos() {
  messageBus.sendCommand('GetTodos', undefined);
}

// UI Rendering (pseudo-code)
function renderTodos() {
  // Update your UI framework here
  console.log('Todos:', todos);
}

// Initial load
loadTodos();
