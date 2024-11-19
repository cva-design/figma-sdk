export function JsonReplacer(_: string, value: any) {
    if (value instanceof Map) {
      return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
      };
    }
    
    return value;
  }


export function JsonReviver(_: string, value: any) {
    if (typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

export function serialize(obj: any): string {
    return JSON.stringify(obj, JsonReplacer);
  }
  
  export function deserialize<T>(obj: any): T {
    return JSON.parse(obj, JsonReviver);
  }
  
  export function deepClone<T>(obj: T): T {
    return deserialize(serialize(obj)) as T;
  }
  