import type { EmptyObject } from 'type-fest';
import type { tags } from 'typia';
import type { Accepted, Rejected } from '../../src/types/message-handling';

// Common validation types
export interface ValidationTestCommands {
  // Test basic validation
  SimpleCommand: {
    text: string & tags.MinLength<1>;
    count: number & tags.Minimum<0>;
  };

  // Test optional fields
  OptionalCommand: {
    required: string & tags.MinLength<1>;
    optional?: number & tags.Minimum<0>;
  };

  // Test complex validation
  ComplexCommand: {
    id: string & tags.Format<'uuid'>;
    email: string & tags.Format<'email'>;
    age: number & tags.Type<'uint32'> & tags.Minimum<18>;
    roles: Array<string> & tags.MinItems<1>;
  };
}

export interface ValidationTestEvents {
  // Test basic validation
  SimpleEvent: {
    message: string & tags.MinLength<1>;
    timestamp: number & tags.Type<'int64'>;
  };

  // Test array validation
  ArrayEvent: {
    items: Array<{
      id: string & tags.Format<'uuid'>;
      value: number & tags.Minimum<0>;
    }> &
      tags.MinItems<1>;
  };
}

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

// Figma Integration Types
export interface FigmaCommands {
  // Figma integration is mostly event-based, but we need at least one command
  // to satisfy the type system and linter
  GetFigmaContext: EmptyObject | null;
}

export interface FigmaEvents {
  SelectionChanged: {
    nodes: Array<{
      id: string & tags.Format<'uuid'>;
      type: string & tags.MinLength<1>;
    }> &
      tags.MinItems<0>;
  };

  DocumentChanged: {
    origin: 'local' | 'remote';
    documentChanges: Array<{
      id: string & tags.Format<'uuid'>;
      type: string & tags.MinLength<1>;
      property?: string & tags.MinLength<1>;
      value?: unknown;
      node?: {
        id: string & tags.Format<'uuid'>;
        type: string & tags.MinLength<1>;
      };
    }> &
      tags.MinItems<1>;
  };

  PluginDataChanged: {
    nodeId: string & tags.Format<'uuid'>;
    key: string & tags.MinLength<1>;
    value: unknown;
  };
}

// Test helper types
export type TestResponse = Accepted | Rejected;

export interface ValidationError {
  field: string;
  message: string;
}

export type NonEmptyArray<T> = [T, ...T[]];
