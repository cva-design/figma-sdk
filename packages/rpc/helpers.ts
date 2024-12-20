import type { JsonObject } from 'type-fest';
import { ValidationManager } from '@figma-plugin-sdk/message-bus';
import type {
  ValidationError,
  ValidationResult,
  ValidationSchema,
} from '@figma-plugin-sdk/message-bus';

export function createMockValidator() {
  return new (class extends ValidationManager {
    private schemas = new Map<string, ValidationSchema>();

    register<T extends JsonObject>(name: string, schema: ValidationSchema<T>): void {
      this.schemas.set(name, schema);
    }

    unregister(name: string): void {
      this.schemas.delete(name);
    }

    get(name: string): ValidationSchema | undefined {
      return this.schemas.get(name);
    }

    validate<S extends JsonObject>(name: string, data: unknown): ValidationResult<S> {
      const schema = this.schemas.get(name);
      if (!schema) {
        return {
          success: false,
          errors: [
            {
              field: '',
              message: `Schema "${name}" not found`,
            },
          ] as [ValidationError, ...ValidationError[]],
        };
      }

      try {
        const isValid = schema.validate(data);
        if (isValid) {
          return { success: true };
        }

        return {
          success: false,
          errors: [
            {
              field: '',
              message: 'Validation failed',
            },
          ] as [ValidationError, ...ValidationError[]],
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Validation failed';
        return {
          success: false,
          errors: [
            {
              field: '',
              message: errorMessage,
            },
          ] as [ValidationError, ...ValidationError[]],
        };
      }
    }

    formatErrors(errors: ValidationError[]): string {
      return errors
        .map((error) => {
          const field = error.field ? ` in ${error.field}` : '';
          return `${error.message}${field}`;
        })
        .join('\n');
    }
  })();
} 