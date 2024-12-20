import type { JsonObject } from 'type-fest';

/**
 * Validation error type
 */
export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

/**
 * Validation result type
 */
export interface ValidationResult<T = unknown> {
  success: boolean;
  errors?: [ValidationError, ...ValidationError[]];
  data?: T;
}

/**
 * Validation schema type
 */
export interface ValidationSchema<T extends JsonObject = JsonObject> {
  validate: (data: unknown) => data is T;
}

/**
 * Validation options
 */
export interface ValidationOptions {
  includeValue?: boolean;
}

/**
 * Custom validation function type
 */
export type CustomValidator<T> = (data: T) => ValidationError[] | null;

/**
 * Schema definition type
 */
export interface SchemaDefinition<T extends JsonObject> {
  validate: (data: unknown) => data is T;
  customValidate?: CustomValidator<T>;
}

/**
 * Schema registry interface
 */
export interface SchemaRegistry<T extends JsonObject> {
  get(name: string): SchemaDefinition<T> | undefined;
  register<S extends T>(name: string, schema: SchemaDefinition<S>): void;
  unregister(name: string): void;
  validate<S extends T>(
    name: string,
    data: unknown,
    options?: ValidationOptions,
  ): ValidationResult<S>;
}
