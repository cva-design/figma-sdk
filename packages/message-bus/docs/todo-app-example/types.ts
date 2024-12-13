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
  GetTodos: void;

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
  TodoAdded: Todo;

  // Read
  TodosLoaded: {
    todos: Todo[];
  };

  // Update
  TodoUpdated: Todo;

  // Delete
  TodoDeleted: {
    id: string;
  };

  // Error
  TodoError: {
    message: string;
    command?: keyof TodoCommands;
  };
}
