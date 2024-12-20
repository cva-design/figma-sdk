import { ValidationError, ValidationResult } from "#source/types";
import { tags } from "typia";

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

/**
 * Creates a mock validator for testing
 */
export function createMockValidator(validateFn: (data: any) => ValidationResult) {
  return {
    schemas: new Map(),
    validate: validateFn,
    validateCommand: (command: string, data: any) => validateFn(data),
    get: () => undefined,
    register: () => {},
    unregister: () => {},
    formatErrors: (errors: ValidationError[]) => errors,
  };
}