export type JsonValue = string | number | boolean | JsonObject | JsonArray | null | undefined;
export interface JsonObject {
    [x: string]: JsonValue;
}
export interface JsonArray extends Array<JsonValue> {
}
export interface JsonRpcRequest {
    jsonrpc: string;
    method: string;
    params?: JsonArray;
    result?: JsonValue;
    id: number;
    error?: InternalMethodError;
}
export interface InternalMethodError extends Error {
    code?: string;
    data?: JsonObject;
}
export type ApiMethodsDictionary = Record<string, (...args: JsonValue[]) => Promise<JsonValue> | JsonValue>;
export interface RpcClientOptions {
    timeout?: number;
}
export type RpcClient<T> = T & RpcClientOptions;
/**
 * Turns a `Promise<R>` type into simply `R`.
 *
 * If the original type T is not't return a Promise, it remains unchanged.
 */
export type Promisify<T> = T extends Promise<unknown> ? T : Promise<T>;
export type MakeFnAsync<T> = T extends (...args: infer TParams) => infer TMaybePromise ? TMaybePromise extends Promise<unknown> ? T : (...args: TParams) => Promise<TMaybePromise> : T;
/**
 * Wraps the return types of all functions with a Promise
 * ONLY when it is not already a promise.
 */
export type MakeAllFnAsync<T> = {
    [K in keyof T]: MakeFnAsync<T[K]>;
};
/**
 * Turns a `Promise<R>` type into simply `R`.
 *
 * If the original type T is not't return a Promise, it remains unchanged.
 */
export type MakeSync<T> = T extends Promise<infer R> ? R : T;
export type MakeFnSync<T> = T extends (...args: infer TParams) => Promise<infer R> ? (...args: TParams) => R : T;
/**
 * Makes all the functions in T synchronous.
 *
 * If the original function returns a Promise<R>, this type converts it to a function returning R.
 * If the original function doesn't return a Promise, it remains unchanged.
 *
 * @template T - The object type containing functions to be converted.
 */
export type MakeAllFnSync<T> = {
    [K in keyof T]: MakeFnSync<T[K]>;
};
/**
 * Alias for {@link MAkeSync}
 */
export type Synchronize<T> = MakeSync<T>;
//# sourceMappingURL=types.d.ts.map