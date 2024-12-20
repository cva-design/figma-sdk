import type { CommandsDefinition, EventsDefinition } from '#source/types/message-handling';
import { TestMessageBus } from '#source/test';
import { vi } from 'vitest';

export function createTestBus<
  Commands extends CommandsDefinition<Commands>,
  Events extends EventsDefinition<Events>
>() {
  const bus = new TestMessageBus<Events>();
  return { bus };
}

export function createMockListener() {
  return vi.fn();
}

export function createValidationError(property: string, message?: string) {
  const error = new Error(message || property);
  error.name = 'ValidationError';
  (error as any).property = message ? property : '';
  return error;
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

class MockValidator {
  #schemas = new Map();
  #validateFn: (data: any) => { success: boolean; errors: Array<{ field: string; message: string }> };

  constructor(validateFn: (data: any) => { success: boolean; errors: Array<{ field: string; message: string }> }) {
    this.#validateFn = validateFn;
  }

  validate = (data: any) => this.#validateFn(data);
  validateCommand = (data: any) => this.#validateFn(data);
  get = () => undefined;
  register = () => {};
  unregister = () => {};
  formatErrors = (errors: Array<{ field: string; message: string }>) => errors;
}

export function createMockValidator(validateFn: (data: any) => { success: boolean; errors: Array<{ field: string; message: string }> }) {
  return new MockValidator(validateFn);
}
