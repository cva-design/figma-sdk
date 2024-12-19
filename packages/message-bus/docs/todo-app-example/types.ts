// Event names as const to ensure type safety
export const TodoEventNames = {
  TodoAdded: 'TodoAdded',
  TodosLoaded: 'TodosLoaded',
  TodoUpdated: 'TodoUpdated',
  TodoDeleted: 'TodoDeleted',
  TodoError: 'TodoError',
} as const;

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoCommands {
  // Create
  AddTodo: {
    text: string;
    completed?: boolean;
  };

  // Read
  GetTodos: null;

  // Update
  UpdateTodo: {
    id: string;
    text?: string;
    completed?: boolean;
  };

  // Delete
  DeleteTodo: {
    id: string;
  };
}

export interface TodoEvents {
  // Create
  [TodoEventNames.TodoAdded]: Todo;

  // Read
  [TodoEventNames.TodosLoaded]: {
    todos: Todo[];
  };

  // Update
  [TodoEventNames.TodoUpdated]: Todo;

  // Delete
  [TodoEventNames.TodoDeleted]: {
    id: string;
  };

  // Error
  [TodoEventNames.TodoError]: {
    message: string;
    command?: keyof TodoCommands;
  };
}
