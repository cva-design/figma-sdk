import type { ValidationError as ValidationErrorType } from '../types/validation';

/**
 * Base error class for message bus errors
 */
export class MessageBusError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MessageBusError';
  }
}

/**
 * Error thrown when validation fails
 */
export class ValidationErrorImpl extends MessageBusError {
  constructor(
    message: string,
    public errors: ValidationErrorType[],
  ) {
    super(message);
    this.name = 'ValidationError';
  }
}

/**
 * Error thrown when a command handler is not found
 */
export class HandlerNotFoundError extends MessageBusError {
  constructor(command: string) {
    super(`No handler registered for command "${command}"`);
    this.name = 'HandlerNotFoundError';
  }
}

/**
 * Error thrown when a schema is not found
 */
export class SchemaNotFoundError extends MessageBusError {
  constructor(name: string) {
    super(`Schema "${name}" not found`);
    this.name = 'SchemaNotFoundError';
  }
}

/**
 * Format validation errors into a readable message
 */
export function formatValidationErrors(errors: ValidationErrorType[]): string {
  return errors
    .map((error) => {
      const field = error.field ? ` in ${error.field}` : '';
      return `${error.message}${field}`;
    })
    .join('\n');
}

/**
 * Create a validation error with field and message
 */
export function createValidationError(
  field: string,
  message: string,
): ValidationErrorType {
  return {
    field,
    message,
  };
}

/**
 * Create a non-empty array of validation errors
 */
export function createValidationErrors(
  ...errors: [ValidationErrorType, ...ValidationErrorType[]]
): [ValidationErrorType, ...ValidationErrorType[]] {
  return errors;
}

/**
 * Check if an error is a validation error
 */
export function isValidationError(
  error: unknown,
): error is ValidationErrorImpl {
  return (
    error instanceof ValidationErrorImpl ||
    (error instanceof Error && error.name === 'ValidationError')
  );
}

/**
 * Check if an error is a handler not found error
 */
export function isHandlerNotFoundError(
  error: unknown,
): error is HandlerNotFoundError {
  return (
    error instanceof HandlerNotFoundError ||
    (error instanceof Error && error.name === 'HandlerNotFoundError')
  );
}

/**
 * Check if an error is a schema not found error
 */
export function isSchemaNotFoundError(
  error: unknown,
): error is SchemaNotFoundError {
  return (
    error instanceof SchemaNotFoundError ||
    (error instanceof Error && error.name === 'SchemaNotFoundError')
  );
}

// Re-export the validation error type
export type { ValidationErrorType as ValidationError };
