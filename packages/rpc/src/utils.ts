import type { JsonObject, JsonValue } from './types';

/**
 * Type guard to check if a value is a function
 *
 * @param value - The value to check
 * @returns True if the value is a function, false otherwise
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * Type guard to check if a value is a Promise
 *
 * Checks for duck-typing of Promise by looking for a 'then' method
 *
 * @param result - The value to check
 * @returns True if the value is a Promise-like object, false otherwise
 */
export function isPromise(
  result: JsonValue | Promise<JsonValue>,
): result is Promise<JsonValue> {
  return Boolean(
    result &&
      typeof result === 'object' &&
      'then' in result &&
      typeof result.then === 'function',
  );
}

/**
 * Converts the value to a valid JSON value.
 *
 * This function:
 * - Recursively converts objects and arrays to JSON-safe versions
 * - Detects and throws an error on circular references
 * - Passes through primitives like strings, numbers, and booleans
 * - Throws an error for non-JSON-serializable values like functions or symbols
 *
 * @param value - Any value to convert to a JSON-compatible value
 * @param seenObjects - WeakSet used internally to track visited objects and detect circular references
 * @returns A JSON-safe version of the input value
 * @throws Error if the value contains circular references or non-serializable types
 */
export function toJsonValue(
  value: unknown,
  seenObjects = new WeakSet(),
): JsonValue {
  if (value === undefined || value === null) {
    return value as JsonValue;
  }

  if (Array.isArray(value)) {
    // Check for circular references
    if (seenObjects.has(value)) {
      throw new Error('Circular reference detected in array');
    }

    // Add this array to seen objects
    seenObjects.add(value);

    // Process array elements
    return value.map((item) => toJsonValue(item, seenObjects));
  }

  if (typeof value === 'object') {
    // Check for circular references
    if (seenObjects.has(value)) {
      throw new Error('Circular reference detected in object');
    }

    // Add this object to seen objects
    seenObjects.add(value);

    // Process object properties
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [
        key,
        toJsonValue(val, seenObjects),
      ]),
    );
  }

  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return value;
  }

  // throw an error if we don't know what to do with the value
  throw new Error(
    `Can't convert value '''${value}''' (type: ${typeof value}) to JsonValue`,
  );
}

/**
 * Converts an object to a JSON-safe object
 *
 * This is a convenience wrapper around toJsonValue that ensures the result is an object.
 *
 * @param value - The object to convert
 * @returns A JSON-safe version of the input object
 * @throws Error if the object contains circular references or non-serializable types
 */
export function toJsonObject(value: object): JsonObject {
  return toJsonValue(value) as JsonObject;
}
