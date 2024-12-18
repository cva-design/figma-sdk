import type { JsonObject, JsonValue } from './types';

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

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
 * When the value is an array or an object, the function
 * recursively removes any functions and converts class instances
 * to plain objects.
 *
 * @param value Anything
 */
export function toJsonValue(value: unknown): JsonValue {
  if (value === undefined || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(toJsonValue);
  }

  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, toJsonValue(val)]),
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

export function toJsonObject(value: object): JsonObject {
  return toJsonValue(value) as JsonObject;
}
