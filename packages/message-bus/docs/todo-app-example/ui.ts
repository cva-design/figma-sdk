import { getMessageBus } from '@figma-plugin-sdk/message-bus';
import type { Todo, TodoCommands, TodoEvents } from './types';
import { TodoEventNames } from './types';

// Create message bus instance for our UI
const messageBus = getMessageBus<TodoCommands, TodoEvents>();

// UI State
let todos: Todo[] = [];

// Event Listeners
// The UI subscribes to events to stay in sync with the backend state
messageBus.listenToEvent(TodoEventNames.TodosLoaded, (event) => {
  todos = event.todos;
  renderTodos();
});

messageBus.listenToEvent(TodoEventNames.TodoAdded, (todo) => {
  todos.push(todo);
  renderTodos();
});

messageBus.listenToEvent(TodoEventNames.TodoUpdated, (todo) => {
  const index = todos.findIndex((t) => t.id === todo.id);
  if (index !== -1) {
    todos[index] = todo;
    renderTodos();
  }
});

messageBus.listenToEvent(TodoEventNames.TodoDeleted, ({ id }) => {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
});

// UI Actions
// These functions send commands to the backend
async function addTodo(text: string) {
  await messageBus.sendCommand('AddTodo', { text });
}

async function toggleTodo(id: string, completed: boolean) {
  await messageBus.sendCommand('UpdateTodo', { id, completed });
}

async function deleteTodo(id: string) {
  await messageBus.sendCommand('DeleteTodo', { id });
}

async function loadTodos() {
  await messageBus.sendCommand('GetTodos', null);
}

// UI Rendering (pseudo-code)
function renderTodos() {
  // Update your UI framework here
  console.log('Todos:', todos);
}

// Initial load
loadTodos();
