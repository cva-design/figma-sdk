import type { JsonObject } from 'type-fest';
import type {
  ValidationError,
  ValidationResult,
  ValidationSchema,
} from './types/validation';

/**
 * Manages validation schemas and performs validation
 */
export class ValidationManager {
  private schemas = new Map<string, ValidationSchema>();

  /**
   * Register a validation schema
   */
  register<T extends JsonObject>(
    name: string,
    schema: ValidationSchema<T>,
  ): void {
    this.schemas.set(name, schema);
  }

  /**
   * Unregister a validation schema
   */
  unregister(name: string): void {
    this.schemas.delete(name);
  }

  /**
   * Get a validation schema
   */
  get(name: string): ValidationSchema | undefined {
    return this.schemas.get(name);
  }

  /**
   * Validate data against a schema
   */
  validate<S extends JsonObject>(
    name: string,
    data: unknown,
  ): ValidationResult<S> {
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

      // If validation fails but doesn't throw, return a generic error
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
      // If validation throws, use the error message
      const errorMessage =
        error instanceof Error ? error.message : 'Validation failed';
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

  /**
   * Format validation errors into a readable message
   */
  formatErrors(errors: ValidationError[]): string {
    return errors
      .map((error) => {
        const field = error.field ? ` in ${error.field}` : '';
        return `${error.message}${field}`;
      })
      .join('\n');
  }
}
