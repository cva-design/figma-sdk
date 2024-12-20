import type { JsonObject, JsonValue } from 'type-fest';

/**
 * Test events for error scenarios
 */
export interface ErrorEvents {
  ErrorEvent: {
    error: string;
    [key: string]: JsonValue;
  };
  ValidationError: {
    field: string;
    message: string;
    [key: string]: JsonValue;
  };
  [key: string]: JsonObject;
}

/**
 * Creates a test error event payload
 */
export function createErrorEvent(error: string) {
  return { error };
}

/**
 * Creates a test validation error event payload
 */
export function createValidationErrorEvent(field: string, message: string) {
  return { field, message };
} 