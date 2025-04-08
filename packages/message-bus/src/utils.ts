/** Represents the serialized structure of a Map object. */
interface MapObject {
  /** Discriminator property to identify Map objects during deserialization. */
  dataType: 'Map';
  /** The key-value pairs of the Map, stored as an array of tuples. */
  value: [unknown, unknown][];
}

/**
 * JSON replacer function for handling complex objects like Maps during serialization.
 * Converts `Map` instances into a specific object structure (`MapObject`).
 * Also handles nested Maps within objects that have a `valueSpace` property.
 * @param _key - The property key (unused in this replacer).
 * @param value - The property value to be potentially replaced.
 * @returns The original value or a serializable representation if it's a Map or contains a Map in `valueSpace`.
 */
export function JsonReplacer(_key: string, value: unknown) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    } as MapObject; // Explicitly cast to MapObject
  }

  // Handle objects with valueSpace containing Maps
  if (
    value &&
    typeof value === 'object' &&
    value !== null &&
    'valueSpace' in value &&
    value.valueSpace instanceof Map
  ) {
    return {
      ...value,
      valueSpace:
        'toJSON' in value.valueSpace &&
        typeof value.valueSpace.toJSON === 'function'
          ? value.valueSpace.toJSON()
          : { dataType: 'Map', value: Array.from(value.valueSpace.entries()) },
    };
  }

  return value;
}

/**
 * JSON reviver function for reconstructing complex objects like Maps during deserialization.
 * Converts objects matching the `MapObject` structure back into `Map` instances.
 * @param _key - The property key (unused in this reviver).
 * @param value - The property value being processed.
 * @returns The original value or a reconstructed `Map` instance.
 */
export function JsonReviver(_key: string, value: unknown) {
  if (typeof value === 'object' && value !== null) {
    const mapObj = value as MapObject;
    if (mapObj.dataType === 'Map') {
      return new Map<unknown, unknown>(mapObj.value);
    }
  }
  return value;
}

/**
 * Serializes an object to a JSON string with special handling for Maps and complex objects.
 * @param obj - Object to serialize.
 * @returns JSON string representation of the object.
 */
export function serialize(obj: unknown): string {
  if (obj === undefined || obj === null) {
    return String(obj);
  }
  return JSON.stringify(obj, JsonReplacer);
}

/**
 * Deserializes a JSON string back to an object with special handling for Maps.
 * Uses the `JsonReviver` to reconstruct `Map` instances.
 * @template T - The expected type of the deserialized object.
 * @param jsonString - JSON string to deserialize.
 * @returns The deserialized object.
 * @throws Error if input is not a string.
 */
export function deserialize<T>(jsonString: unknown): T {
  if (typeof jsonString !== 'string') {
    throw new Error('Input must be a string');
  }
  return JSON.parse(jsonString, JsonReviver);
}

/**
 * Creates a deep clone of an object using serialization/deserialization.
 * This method handles complex types supported by `JsonReplacer` and `JsonReviver` (like `Map`).
 * @template T - The type of the object being cloned.
 * @param obj - Object to clone.
 * @returns A deep clone of the object.
 */
export function deepClone<T>(obj: T): T {
  return deserialize(serialize(obj)); // No need for explicit cast, deserialize returns T
}

/**
 * Helper function to serialize data specifically for the MessageBus.
 * This handles serialization without requiring string output,
 * making it suitable for direct object serialization.
 *
 * @param data Data to serialize
 * @returns Serialized data in object form
 */
export function serializeForMessageBus(data: unknown): unknown {
  if (data === undefined || data === null) {
    return data;
  }
  return JSON.parse(JSON.stringify(data, JsonReplacer));
}
