import type { JsonObject } from 'type-fest';

/**
 * Basic test command interface used in message bus tests
 */
export interface TestCommand extends JsonObject {
  id: string;
  data: string;
}

/**
 * Basic test commands map used in message bus tests
 */
export interface TestCommands {
  TestCommand: TestCommand;
}

/**
 * Basic test event interface used in message bus tests
 */
export interface TestEvent extends JsonObject {
  id: string;
  data: string;
}

/**
 * Basic test events map used in message bus tests
 */
export interface TestEvents {
  TestEvent: TestEvent;
}

/**
 * Creates a test command payload
 */
export function createTestCommand(id: string, data: string): TestCommand {
  return { id, data };
}

/**
 * Creates a test event payload
 */
export function createTestEvent(id: string, data: string): TestEvent {
  return { id, data };
} 