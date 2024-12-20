import type { tags } from 'typia';
import type { Accepted, Rejected } from '../../src/types/message-handling';


// Todo App Example Types
export interface TodoCommands {
  AddTodo: {
    text: string & tags.MinLength<1> & tags.MaxLength<100>;
    completed?: boolean;
  };

  UpdateTodo: {
    id: string & tags.Format<'uuid'>;
    text?: string & tags.MinLength<1> & tags.MaxLength<100>;
    completed?: boolean;
  };

  DeleteTodo: {
    id: string & tags.Format<'uuid'>;
  };
}

export interface TodoEvents {
  TodoAdded: {
    id: string & tags.Format<'uuid'>;
    text: string & tags.MinLength<1>;
    completed: boolean;
  };

  TodosLoaded: {
    todos: Array<{
      id: string & tags.Format<'uuid'>;
      text: string & tags.MinLength<1>;
      completed: boolean;
    }> &
      tags.MinItems<0>;
  };

  TodoError: {
    message: string & tags.MinLength<1>;
    command?: keyof TodoCommands;
  };
}

// Test helper types
export type TestResponse = Accepted | Rejected;

export interface ValidationError {
  field: string;
  message: string;
}

export type NonEmptyArray<T> = [T, ...T[]];
