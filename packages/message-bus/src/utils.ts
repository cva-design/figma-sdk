interface MapObject {
  dataType: 'Map';
  value: [unknown, unknown][];
}

/**
 * JSON replacer function for handling complex objects like Maps during serialization.
 * @param key Property key
 * @param value Property value
 * @returns Serializable value
 */
export function JsonReplacer(_: string, value: unknown) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()),
    };
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
 * @param key Property key
 * @param value Property value
 * @returns Deserialized value
 */
export function JsonReviver(_: string, value: unknown) {
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
 * @param obj Object to serialize
 * @returns JSON string
 */
export function serialize(obj: unknown): string {
  if (obj === undefined || obj === null) {
    return String(obj);
  }
  return JSON.stringify(obj, JsonReplacer);
}

/**
 * Deserializes a JSON string back to an object with special handling for Maps.
 * @param obj JSON string to deserialize
 * @returns Deserialized object
 * @throws Error if input is not a string
 */
export function deserialize<T>(obj: unknown): T {
  if (typeof obj !== 'string') {
    throw new Error('Input must be a string');
  }
  return JSON.parse(obj, JsonReviver);
}

/**
 * Creates a deep clone of an object using serialization/deserialization.
 * @param obj Object to clone
 * @returns Deep clone of the object
 */
export function deepClone<T>(obj: T): T {
  return deserialize(serialize(obj)) as T;
}

/**
 * Helper function to serialize data for the MessageBus.
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
