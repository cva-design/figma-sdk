import { vi } from 'vitest';
import { MessageBus } from '../../src';
import type { ValidationError } from './types';

// Add type definitions for test methods
interface TestBus<TCommands, TEvents> extends MessageBus<TCommands, TEvents> {
  mockCommandResponse: (command: keyof TCommands, response: any) => void;
  mockEventValidation: (
    event: keyof TEvents,
    validator: (event: any) => boolean,
  ) => void;
  mockCommandValidation: (
    command: keyof TCommands,
    validator: (command: any) => boolean,
  ) => void;
}

export function createMockListener() {
  return vi.fn((payload: any, scope?: string) => {
    // Only return the payload to match the test expectations
    return payload;
  });
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function createValidationError(message: string): ValidationError {
  return {
    field: '',
    message,
  };
}

export function createTestBus<
  TCommands extends Record<string, any>,
  TEvents extends Record<string, any>,
>() {
  const bus = new MessageBus<TCommands, TEvents>() as TestBus<TCommands, TEvents>;

  // Add mock response functionality
  const mockResponses = new Map<string, any>();
  const eventValidators = new Map<string, (event: any) => boolean>();
  const commandValidators = new Map<string, (command: any) => boolean>();

  bus.mockCommandResponse = (command: keyof TCommands, response: any) => {
    mockResponses.set(command as string, response);
  };

  bus.mockEventValidation = (
    event: keyof TEvents,
    validator: (event: any) => boolean,
  ) => {
    eventValidators.set(event as string, validator);
  };

  bus.mockCommandValidation = (
    command: keyof TCommands,
    validator: (command: any) => boolean,
  ) => {
    commandValidators.set(command as string, validator);
  };

  // Override sendCommand to use mock responses and validation
  const originalSendCommand = bus.sendCommand.bind(bus);
  bus.sendCommand = async (
    command: keyof TCommands,
    data: TCommands[keyof TCommands],
  ) => {
    const validator = commandValidators.get(command as string);
    if (validator) {
      validator(data);
    }

    const mockResponse = mockResponses.get(command as string);
    if (mockResponse) {
      if (typeof mockResponse === 'function') {
        return mockResponse(data);
      }
      return mockResponse;
    }
    return originalSendCommand(command, data);
  };

  // Override publishEvent to use validation
  const originalPublishEvent = bus.publishEvent.bind(bus);
  bus.publishEvent = (event: keyof TEvents, data: TEvents[keyof TEvents]) => {
    const validator = eventValidators.get(event as string);
    if (validator) {
      validator(data);
    }
    return originalPublishEvent(event, data);
  };

  return { bus };
}

export function createNonEmptyArray<T>(item: T): [T, ...T[]] {
  return [item];
}

export function expectAccepted(promise: Promise<any>) {
  return expect(promise).resolves.toEqual(
    expect.objectContaining({
      status: 'accepted',
    }),
  );
}

export function expectRejected(
  promise: Promise<any>,
  errors: ValidationError[],
) {
  return expect(promise).resolves.toEqual(
    expect.objectContaining({
      status: 'rejected',
      errors,
    }),
  );
}
