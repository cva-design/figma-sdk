import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { MessageBus, ValidationManager } from '../../src';
import { TestEvents } from '#tests/utils/fixtures/message-bus.js';

describe('Command Handling', () => {
  let messageBus: MessageBus<{}, {}>;
  let validationManager: ValidationManager;

  beforeEach(() => {
    validationManager = new ValidationManager();
    messageBus = new MessageBus({ validator: validationManager });
  });

  afterEach(() => {
    messageBus.cleanup();
  });

  describe('Basic Command Flow', () => {
    it('should return Accepted on success', async () => {
      interface TestCommands {
        TestCommand: { data: string };
      }

      const bus = new MessageBus<TestCommands, TestEvents>();
      const handler = vi
        .fn()
        .mockResolvedValue({ status: 'accepted' as const });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { data: 'test' });

      expect(result.status).toBe('accepted');
      expect(handler).toHaveBeenCalledWith({ data: 'test' });
    });

    it('should return Rejected on validation failure', async () => {
      interface TestCommands {
        TestCommand: { data: string };
      }

      const validator = new ValidationManager();
      validator.register('TestCommand', {
        validate: (data): data is { data: string } => {
          return (
            typeof data === 'object' &&
            data !== null &&
            typeof (data as any).data === 'string'
          );
        },
      });

      const bus = new MessageBus<TestCommands, TestEvents>({ validator });
      const handler = vi.fn();

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { data: 123 as any });

      expect(result.status).toBe('rejected');
      expect(result.errors).toBeDefined();
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle missing command handlers', async () => {
      interface TestCommands {
        TestCommand: { data: string };
      }

      const bus = new MessageBus<TestCommands, TestEvents>();
      const result = await bus.sendCommand('TestCommand', { data: 'test' });

      expect(result.status).toBe('rejected');
      expect(result.message).toContain('No handler registered');
    });

    it('should validate command payload', async () => {
      interface TestCommands {
        TestCommand: { data: string; optional?: number };
      }

      const validator = new ValidationManager();
      validator.register('command/TestCommand', {
        validate: (data): data is { data: string; optional?: number } => {
          return (
            typeof data === 'object' &&
            data !== null &&
            typeof (data as any).data === 'string' &&
            (typeof (data as any).optional === 'number' ||
              (data as any).optional === undefined)
          );
        },
      });

      const bus = new MessageBus<TestCommands, TestEvents>({ validator });
      const handler = vi
        .fn()
        .mockResolvedValue({ status: 'accepted' as const });

      bus.handleCommand('TestCommand', handler);

      // Valid payload
      const result1 = await bus.sendCommand('TestCommand', {
        data: 'test',
        optional: 123,
      });
      expect(result1.status).toBe('accepted');

      // Invalid payload
      const result2 = await bus.sendCommand('TestCommand', {
        data: 'test',
        optional: '123' as any,
      });
      expect(result2.status).toBe('rejected');
    });

    it('should validate optional fields', async () => {
      interface TestCommands {
        TestCommand: { data: string; optional?: number };
      }

      const validator = new ValidationManager();
      validator.register('command/TestCommand', {
        validate: (data): data is { data: string; optional?: number } => {
          return (
            typeof data === 'object' &&
            data !== null &&
            typeof (data as any).data === 'string' &&
            (typeof (data as any).optional === 'number' ||
              (data as any).optional === undefined)
          );
        },
      });

      const bus = new MessageBus<TestCommands, TestEvents>({ validator });
      const handler = vi
        .fn()
        .mockResolvedValue({ status: 'accepted' as const });

      bus.handleCommand('TestCommand', handler);

      // Without optional field
      const result1 = await bus.sendCommand('TestCommand', { data: 'test' });
      expect(result1.status).toBe('accepted');

      // With optional field
      const result2 = await bus.sendCommand('TestCommand', {
        data: 'test',
        optional: 123,
      });
      expect(result2.status).toBe('accepted');
    });
  });

  describe('Response Types', () => {
    it('should handle Accepted response with data', async () => {
      interface TestCommands {
        TestCommand: { input: string };
      }

      const bus = new MessageBus<TestCommands, TestEvents>();
      const responseData = { result: 'processed' };
      const handler = vi.fn().mockResolvedValue({
        status: 'accepted' as const,
        data: responseData,
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { input: 'test' });

      expect(result.status).toBe('accepted');
      expect(result.data).toEqual(responseData);
    });

    it('should handle Rejected response with errors', async () => {
      interface TestCommands {
        TestCommand: { input: string };
      }

      const bus = new MessageBus<TestCommands, TestEvents>();
      const errors = [{ field: 'input', message: 'Invalid input' }];
      const handler = vi.fn().mockResolvedValue({
        status: 'rejected' as const,
        errors,
        message: 'Validation failed',
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { input: 'test' });

      expect(result.status).toBe('rejected');
      expect((result as any).errors).toEqual(errors);
      expect(result.message).toBe('Validation failed');
    });
  });

  describe('Complex Validation', () => {
    it('should validate nested objects', async () => {
      interface TestCommands {
        TestCommand: {
          user: {
            id: string;
            profile: {
              name: string;
              age: number;
            };
          };
        };
      }

      const validator = new ValidationManager();
      validator.register('command/TestCommand', {
        validate: (data): data is TestCommands['TestCommand'] => {
          const d = data as any;
          return (
            typeof d === 'object' &&
            d !== null &&
            typeof d.user === 'object' &&
            typeof d.user.id === 'string' &&
            typeof d.user.profile === 'object' &&
            typeof d.user.profile.name === 'string' &&
            typeof d.user.profile.age === 'number'
          );
        },
      });

      const bus = new MessageBus<TestCommands, TestEvents>({ validator });
      const handler = vi
        .fn()
        .mockResolvedValue({ status: 'accepted' as const });

      bus.handleCommand('TestCommand', handler);

      // Valid nested object
      const result1 = await bus.sendCommand('TestCommand', {
        user: {
          id: '123',
          profile: {
            name: 'Test User',
            age: 25,
          },
        },
      });
      expect(result1.status).toBe('accepted');

      // Invalid nested object
      const result2 = await bus.sendCommand('TestCommand', {
        user: {
          id: '123',
          profile: {
            name: 'Test User',
            age: '25' as any, // Invalid type
          },
        },
      });
      expect(result2.status).toBe('rejected');
    });

    it('should validate array fields', async () => {
      interface TestCommands {
        TestCommand: {
          items: Array<{
            id: string;
            value: number;
          }>;
        };
      }

      const validator = new ValidationManager();
      validator.register('command/TestCommand', {
        validate: (data): data is TestCommands['TestCommand'] => {
          const d = data as any;
          return (
            Array.isArray(d?.items) &&
            d.items.every(
              (item: any) =>
                typeof item === 'object' &&
                typeof item.id === 'string' &&
                typeof item.value === 'number',
            )
          );
        },
      });

      const bus = new MessageBus<TestCommands, TestEvents>({ validator });
      const handler = vi
        .fn()
        .mockResolvedValue({ status: 'accepted' as const });

      bus.handleCommand('TestCommand', handler);

      // Valid array
      const result1 = await bus.sendCommand('TestCommand', {
        items: [
          { id: '1', value: 10 },
          { id: '2', value: 20 },
        ],
      });
      expect(result1.status).toBe('accepted');

      // Invalid array item
      const result2 = await bus.sendCommand('TestCommand', {
        items: [
          { id: '1', value: 10 },
          { id: '2', value: '20' as any }, // Invalid type
        ],
      });
      expect(result2.status).toBe('rejected');

      // Empty array should be valid
      const result3 = await bus.sendCommand('TestCommand', {
        items: [],
      });
      expect(result3.status).toBe('accepted');
    });
  });
});
