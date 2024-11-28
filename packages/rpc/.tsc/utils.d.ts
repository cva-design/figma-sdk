import type { JsonObject, JsonValue } from './types';
export declare function isFunction(value: unknown): value is Function;
export declare function isPromise(result: JsonValue | Promise<JsonValue>): result is Promise<JsonValue>;
/**
 * Converts the value to a valid JSON value.
 *
 * When the value is an array or an object, the function
 * recursively removes any functions and converts class instances
 * to plain objects.
 *
 * @param value Anything
 */
export declare function toJsonValue(value: unknown): JsonValue;
export declare function toJsonObject(value: object): JsonObject;
//# sourceMappingURL=utils.d.ts.map