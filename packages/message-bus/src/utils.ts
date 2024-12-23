interface MapObject {
  dataType: 'Map';
  value: [unknown, unknown][];
}

export function JsonReplacer(_: string, value: unknown) {
  if (value instanceof Map) {
    return {
      dataType: 'Map',
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  }

  return value;
}

export function JsonReviver(_: string, value: unknown) {
  if (typeof value === 'object' && value !== null) {
    const mapObj = value as MapObject;
    if (mapObj.dataType === 'Map') {
      return new Map<unknown, unknown>(mapObj.value);
    }
  }
  return value;
}

export function serialize(obj: unknown): string {
  return JSON.stringify(obj, JsonReplacer);
}

export function deserialize<T>(obj: unknown): T {
  if (typeof obj !== 'string') {
    throw new Error('Input must be a string');
  }
  return JSON.parse(obj, JsonReviver);
}

export function deepClone<T>(obj: T): T {
  return deserialize(serialize(obj)) as T;
}
