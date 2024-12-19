import type { JsonObject, JsonValue } from 'type-fest';
import { describe, expect, it, vi } from 'vitest';
import { MessageBus } from '../../src';
import { createMockListener } from '../utils/helpers';

interface TestCommand extends JsonObject {
  required: string;
  [key: string]: JsonValue;
}

interface TestCommands {
  TestCommand: TestCommand;
  [key: string]: JsonObject;
}

interface TestEvents {
  ErrorEvent: { error: string; [key: string]: JsonValue };
  ValidationError: { field: string; message: string; [key: string]: JsonValue };
  [key: string]: JsonObject;
}

interface ValidationError {
  field: string;
  message: string;
}

interface ValidationResult {
  success: boolean;
  errors?: ValidationError[];
}

// Mock validator for testing
const createMockValidator = (validateFn: (data: any) => ValidationResult) => ({
  schemas: new Map(),
  validate: validateFn,
  validateCommand: (command: string, data: any) => validateFn(data),
  get: () => undefined,
  register: () => {},
  unregister: () => {},
  formatErrors: (errors: ValidationError[]) => errors,
});

describe('Error Handling', () => {
  describe('Runtime Errors', () => {
    it('should handle not found errors', async () => {
      const bus = new MessageBus<TestCommands>();
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('rejected');
      expect(result.message).toContain('No handler registered');
    });

    it('should broadcast error events', () => {
      const bus = new MessageBus<Record<string, JsonObject>, TestEvents>();
      const listener = createMockListener();

      bus.listenToEvent('ErrorEvent', listener);
      bus.publishEvent('ErrorEvent', { error: 'Test error' });

      expect(listener).toHaveBeenCalledWith({ error: 'Test error' });
    });

    it('should handle missing Figma API', async () => {
      const bus = new MessageBus<TestCommands>();
      const handler = vi.fn().mockImplementation(() => {
        throw new Error('Figma API not available');
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('rejected');
      expect(result.message).toBe('Figma API not available');
    });

    it('should handle circular references', async () => {
      const bus = new MessageBus<TestCommands>();
      const circular: any = { prop: 'value' };
      circular.self = circular;

      const handler = vi.fn().mockImplementation(() => {
        return { status: 'accepted' as const, data: circular };
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('accepted');
      expect(() => JSON.stringify(result)).toThrow(/cyclic|circular/i);
    });

    it('should handle invalid JSON', async () => {
      const bus = new MessageBus<TestCommands>();
      const handler = vi.fn().mockImplementation(() => {
        const invalid = {
          toJSON() {
            throw new Error('Invalid JSON');
          },
        };
        return { status: 'accepted' as const, data: invalid };
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('accepted');
      expect(() => JSON.stringify(result)).toThrow(/invalid json/i);
    });

    it('should handle API errors gracefully', async () => {
      const bus = new MessageBus<TestCommands>();
      const handler = vi.fn().mockImplementation(() => {
        throw new Error('API rate limit exceeded');
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('rejected');
      expect(result.message).toBe('API rate limit exceeded');
    });

    it('should handle concurrent error scenarios', async () => {
      const bus = new MessageBus<TestCommands>();
      const errorListener = createMockListener();
      bus.listenToEvent('Error' as any, errorListener);

      const promises = Array(10)
        .fill(0)
        .map(() => bus.sendCommand('TestCommand', { required: 'test' }));

      const results = await Promise.all(promises);
      for (const result of results) {
        expect(result.status).toBe('rejected');
        expect(result.message).toContain('No handler registered');
      }
    });
  });

  describe('Validation Errors', () => {
    it('should reject empty required fields', async () => {
      const validator = createMockValidator((data) => ({
        success: data.required && data.required.length > 0,
        errors: [
          { field: 'required', message: 'Required field cannot be empty' },
        ],
      }));

      const bus = new MessageBus<TestCommands>({ validator });
      const handler = vi.fn();
      bus.handleCommand('TestCommand', handler);

      const result = await bus.sendCommand('TestCommand', { required: '' });
      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.errors[0].message).toBe('Required field cannot be empty');
      }
      expect(handler).not.toHaveBeenCalled();
    });

    it('should reject invalid formats', async () => {
      interface EmailCommand extends JsonObject {
        email: string;
        [key: string]: JsonValue;
      }

      interface EmailCommands {
        EmailCommand: EmailCommand;
        [key: string]: JsonObject;
      }

      const emailValidator = createMockValidator((data) => ({
        success: /^[^@]+@[^@]+\.[^@]+$/.test(data.email),
        errors: [{ field: 'email', message: 'Invalid email format' }],
      }));

      const bus = new MessageBus<EmailCommands>({ validator: emailValidator });
      const handler = vi.fn();
      bus.handleCommand('EmailCommand', handler);

      const result = await bus.sendCommand('EmailCommand', {
        email: 'not-an-email',
      });
      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.errors[0].message).toBe('Invalid email format');
      }
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle validation errors in nested objects', async () => {
      interface Contact extends JsonObject {
        email: string;
        [key: string]: JsonValue;
      }

      interface User extends JsonObject {
        name: string;
        age: number;
        contact: Contact;
        [key: string]: JsonValue;
      }

      interface NestedCommand extends JsonObject {
        user: User;
        [key: string]: JsonValue;
      }

      interface NestedCommands {
        NestedCommand: NestedCommand;
        [key: string]: JsonObject;
      }

      const nestedValidator = createMockValidator((data) => ({
        success: false,
        errors: [
          { field: 'user.name', message: 'Name cannot be empty' },
          { field: 'user.age', message: 'Age must be positive' },
          { field: 'user.contact.email', message: 'Invalid email format' },
        ],
      }));

      const bus = new MessageBus<NestedCommands>({
        validator: nestedValidator,
      });
      const handler = vi.fn();
      bus.handleCommand('NestedCommand', handler);

      const result = await bus.sendCommand('NestedCommand', {
        user: {
          name: '',
          age: -1,
          contact: {
            email: 'invalid-email',
          },
        },
      });

      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.errors).toHaveLength(3);
        expect(result.errors.map((e: ValidationError) => e.message)).toEqual([
          'Name cannot be empty',
          'Age must be positive',
          'Invalid email format',
        ]);
      }
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle array validation errors', async () => {
      interface ArrayCommand extends JsonObject {
        items: string[];
        [key: string]: JsonValue;
      }

      interface ArrayCommands {
        ArrayCommand: ArrayCommand;
        [key: string]: JsonObject;
      }

      const arrayValidator = createMockValidator((data) => ({
        success: data?.items?.every((item: string) => item.length > 0) ?? false,
        errors: [{ field: 'items', message: 'Array items cannot be empty' }],
      }));

      const bus = new MessageBus<ArrayCommands>({ validator: arrayValidator });
      const handler = vi.fn();
      bus.handleCommand('ArrayCommand', handler);

      const result = await bus.sendCommand('ArrayCommand', {
        items: ['', 'valid'],
      });

      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.errors[0].message).toBe('Array items cannot be empty');
      }
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle custom validation rules', async () => {
      interface CustomCommand extends JsonObject {
        value: number;
        [key: string]: JsonValue;
      }

      interface CustomCommands {
        CustomCommand: CustomCommand;
        [key: string]: JsonObject;
      }

      const customValidator = createMockValidator((data) => ({
        success: data.value >= 1 && data.value <= 10,
        errors: [{ field: 'value', message: 'Value must be between 1 and 10' }],
      }));

      const bus = new MessageBus<CustomCommands>({
        validator: customValidator,
      });
      const handler = vi.fn();
      bus.handleCommand('CustomCommand', handler);

      const result = await bus.sendCommand('CustomCommand', { value: 20 });

      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.errors[0].message).toBe('Value must be between 1 and 10');
      }
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle multiple validation errors', async () => {
      interface MultiCommand extends JsonObject {
        name: string;
        age: number;
        email: string;
        [key: string]: JsonValue;
      }

      interface MultiCommands {
        MultiCommand: MultiCommand;
        [key: string]: JsonObject;
      }

      const multiValidator = createMockValidator((data) => ({
        success: false,
        errors: [
          { field: 'name', message: 'Name cannot be empty' },
          { field: 'age', message: 'Age must be positive' },
          { field: 'email', message: 'Invalid email format' },
        ],
      }));

      const bus = new MessageBus<MultiCommands>({ validator: multiValidator });
      const handler = vi.fn();
      bus.handleCommand('MultiCommand', handler);

      const result = await bus.sendCommand('MultiCommand', {
        name: '',
        age: -1,
        email: 'invalid',
      });

      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.errors).toHaveLength(3);
        expect(result.errors.map((e: ValidationError) => e.message)).toEqual([
          'Name cannot be empty',
          'Age must be positive',
          'Invalid email format',
        ]);
      }
      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('API Errors', () => {
    it('should handle network timeouts', async () => {
      const bus = new MessageBus<TestCommands>();
      const handler = vi.fn().mockImplementation(() => {
        const error = new Error('Network timeout');
        (error as any).code = 'NETWORK_ERROR';
        throw error;
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('rejected');
      expect(result.message).toBe('Network timeout');
      if (result.status === 'rejected') {
        expect(result.errors[0]).toEqual({
          field: '',
          message: 'Command handler error',
        });
      }
    });

    it('should handle rate limiting', async () => {
      const bus = new MessageBus<TestCommands>();
      let attempts = 0;

      const handler = vi.fn().mockImplementation(() => {
        attempts++;
        if (attempts <= 3) {
          throw new Error('Rate limit exceeded');
        }
        return { status: 'accepted' as const };
      });

      bus.handleCommand('TestCommand', handler);

      // First three attempts should fail
      for (let i = 0; i < 3; i++) {
        const result = await bus.sendCommand('TestCommand', {
          required: 'test',
        });
        expect(result.status).toBe('rejected');
        expect(result.message).toBe('Rate limit exceeded');
      }

      // Fourth attempt should succeed
      const result = await bus.sendCommand('TestCommand', { required: 'test' });
      expect(result.status).toBe('accepted');
    });

    it('should handle API version mismatches', async () => {
      const bus = new MessageBus<TestCommands>();
      const handler = vi.fn().mockImplementation(() => {
        const error = new Error('API version not supported');
        (error as any).code = 'VERSION_ERROR';
        throw error;
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('rejected');
      expect(result.message).toBe('API version not supported');
      if (result.status === 'rejected') {
        expect(result.errors[0]).toEqual({
          field: '',
          message: 'Command handler error',
        });
      }
    });
  });

  describe('Complex Error Scenarios', () => {
    it('should handle nested circular references', async () => {
      const bus = new MessageBus<TestCommands>();
      const circular: any = {
        level1: {
          level2: {
            level3: {},
          },
        },
      };
      circular.level1.level2.level3.back = circular.level1;

      const handler = vi.fn().mockImplementation(() => {
        return { status: 'accepted' as const, data: circular };
      });

      bus.handleCommand('TestCommand', handler);
      const result = await bus.sendCommand('TestCommand', { required: 'test' });

      expect(result.status).toBe('accepted');
      expect(() => JSON.stringify(result)).toThrow(/cyclic|circular/i);
    });

    it('should handle deep validation errors', async () => {
      interface DeepCommand extends JsonObject {
        config: {
          settings: {
            preferences: {
              theme: string;
              notifications: boolean;
            };
          };
        };
        [key: string]: JsonValue;
      }

      interface DeepCommands {
        DeepCommand: DeepCommand;
        [key: string]: JsonObject;
      }

      const deepValidator = createMockValidator((data) => ({
        success: false,
        errors: [
          {
            field: 'config.settings.preferences.theme',
            message: 'Theme must be a string',
          },
          {
            field: 'config.settings.preferences.notifications',
            message: 'Notifications must be a boolean',
          },
        ],
      }));

      const bus = new MessageBus<DeepCommands>({ validator: deepValidator });
      const handler = vi.fn();
      bus.handleCommand('DeepCommand', handler);

      const result = await bus.sendCommand('DeepCommand', {
        config: {
          settings: {
            preferences: {
              theme: 123,
              notifications: 'yes',
            },
          },
        },
      } as any);

      expect(result.status).toBe('rejected');
      if (result.status === 'rejected') {
        expect(result.errors).toHaveLength(2);
        expect(result.errors.map((e: ValidationError) => e.message)).toEqual([
          'Theme must be a string',
          'Notifications must be a boolean',
        ]);
      }
      expect(handler).not.toHaveBeenCalled();
    });

    it('should handle concurrent validation errors', async () => {
      const validator = createMockValidator((data) => ({
        success: data.required && data.required.length > 0,
        errors: [
          { field: 'required', message: 'Required field cannot be empty' },
        ],
      }));

      const bus = new MessageBus<TestCommands>({ validator });
      bus.handleCommand('TestCommand', vi.fn());

      const invalidCommands = Array(5)
        .fill(0)
        .map(() => ({
          required: '',
        }));

      const results = await Promise.all(
        invalidCommands.map((cmd) => bus.sendCommand('TestCommand', cmd)),
      );

      for (const result of results) {
        expect(result.status).toBe('rejected');
        if (result.status === 'rejected') {
          expect(result.errors[0].message).toBe(
            'Required field cannot be empty',
          );
        }
      }
    });
  });
});
