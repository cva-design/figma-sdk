import type { JsonObject } from 'type-fest';

/**
 * Deep clones any value, handling special types like Date, RegExp, Map, Set, Error, and TypedArrays
 * @param obj The value to clone
 * @returns A deep clone of the input value
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as unknown as T;
  }

  if (obj instanceof Map) {
    const clone = new Map();
    for (const [key, value] of obj) {
      clone.set(deepClone(key), deepClone(value));
    }
    return clone as unknown as T;
  }

  if (obj instanceof Set) {
    const clone = new Set();
    for (const value of obj) {
      clone.add(deepClone(value));
    }
    return clone as unknown as T;
  }

  if (obj instanceof Error) {
    const clone = new Error(obj.message);
    Object.assign(clone, obj);
    return clone as unknown as T;
  }

  if (ArrayBuffer.isView(obj)) {
    const TypedArray = obj.constructor as new (
      arr: ArrayLike<number>,
    ) => ArrayBufferView;
    const array = Array.from(obj as unknown as ArrayLike<number>);
    return new TypedArray(array) as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  const clone = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      (clone as any)[key] = deepClone((obj as any)[key]);
    }
  }
  return clone;
}

interface SerializedValue<T> {
  __type: string;
  value: T;
}

interface SerializedRegExp {
  __type: 'RegExp';
  source: string;
  flags: string;
}

interface SerializedError {
  __type: 'Error';
  message: string;
  stack?: string;
}

/**
 * Custom JSON replacer that handles special types during serialization
 * @param _ The key being processed (unused)
 * @param value The value being serialized
 * @returns The processed value ready for serialization
 */
export function jsonReplacer(_: string, value: unknown): unknown {
  if (value === undefined) {
    return null;
  }

  if (value instanceof Date) {
    return {
      __type: 'Date',
      value: value.toISOString(),
    } as SerializedValue<string>;
  }

  if (value instanceof RegExp) {
    return {
      __type: 'RegExp',
      source: value.source,
      flags: value.flags,
    } as SerializedRegExp;
  }

  if (value instanceof Map) {
    return {
      __type: 'Map',
      value: Array.from(value.entries()),
    } as SerializedValue<[unknown, unknown][]>;
  }

  if (value instanceof Set) {
    return {
      __type: 'Set',
      value: Array.from(value),
    } as SerializedValue<unknown[]>;
  }

  if (value instanceof Error) {
    return {
      __type: 'Error',
      message: value.message,
      stack: value.stack,
    } as SerializedError;
  }

  if (ArrayBuffer.isView(value)) {
    return {
      __type: 'TypedArray',
      value: Array.from(value as unknown as ArrayLike<number>),
    } as SerializedValue<number[]>;
  }

  return value;
}

/**
 * Custom JSON reviver that restores special types during deserialization
 * @param _ The key being processed (unused)
 * @param value The value being deserialized
 * @returns The restored value
 */
export function jsonReviver(_: string, value: unknown): unknown {
  if (
    value &&
    typeof value === 'object' &&
    '__type' in value &&
    typeof (value as { __type: unknown }).__type === 'string'
  ) {
    const serialized = value as SerializedValue<unknown>;

    switch (serialized.__type) {
      case 'Date':
        return new Date(serialized.value as string);

      case 'RegExp': {
        const regExp = value as SerializedRegExp;
        return new RegExp(regExp.source, regExp.flags);
      }

      case 'Map':
        return new Map(serialized.value as [unknown, unknown][]);

      case 'Set':
        return new Set(serialized.value as unknown[]);

      case 'Error': {
        const errorData = value as SerializedError;
        const error = new Error(errorData.message);
        if (errorData.stack) {
          error.stack = errorData.stack;
        }
        return error;
      }

      case 'TypedArray':
        return new Uint8Array(serialized.value as number[]);

      default:
        return value;
    }
  }

  return value;
}

/**
 * Serializes any value to a JSON string, handling special types
 * @param obj The value to serialize
 * @returns A JSON string representation of the value
 */
export function serialize<T>(obj: T): string {
  return JSON.stringify(obj, jsonReplacer);
}

/**
 * Deserializes a JSON string back into its original form, restoring special types
 * @param json The JSON string to deserialize
 * @returns The restored value
 * @throws {Error} If the input is not a string
 */
export function deserialize<T>(json: string): T {
  if (typeof json !== 'string') {
    throw new Error('Input must be a string');
  }
  return JSON.parse(json, jsonReviver) as T;
}

/**
 * Checks if a value can be serialized to JSON
 * @param obj The value to check
 * @returns True if the value can be serialized, false otherwise
 */
export function isSerializable(obj: unknown): boolean {
  try {
    JSON.stringify(obj, jsonReplacer);
    return true;
  } catch {
    return false;
  }
}

/**
 * Converts an object to a serializable form
 * @param obj The object to convert
 * @returns A serializable version of the object
 */
export function toSerializable<T extends JsonObject>(obj: T): JsonObject {
  return JSON.parse(JSON.stringify(obj, jsonReplacer));
}

/**
 * Converts a serialized object back to its original form
 * @param obj The serialized object to convert
 * @returns The restored object
 */
export function fromSerializable<T extends JsonObject>(obj: JsonObject): T {
  return JSON.parse(JSON.stringify(obj), jsonReviver) as T;
}
