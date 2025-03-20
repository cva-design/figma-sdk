/**
 * Represents a JSON-compatible value
 */
export type JsonValue =
  | string
  | number
  | boolean
  | JsonObject
  | JsonArray
  | null
  | undefined;

/**
 * Represents a JSON-compatible object
 */
export interface JsonObject {
  [x: string]: JsonValue;
}

/**
 * Represents a JSON-compatible array
 */
export interface JsonArray extends Array<JsonValue> {}

/**
 * Represents a JSON-RPC request/response object
 */
export interface JsonRpcRequest {
  jsonrpc: string;
  method: string;
  params?: JsonArray;
  result?: JsonValue;
  id: number;
  error?: InternalMethodError;
  /**
   * Client ID for distinguishing between multiple RPC clients
   */
  clientId?: number;
}

/**
 * Represents an error object in a JSON-RPC response
 */
export interface InternalMethodError {
  code: number;
  message: string;
  name?: string;
}

/**
 * Options for RPC clients and API initialization
 */
export interface RpcClientOptions {
  /**
   * Request timeout in milliseconds (default: 6000)
   */
  timeout?: number;

  /**
   * Enable debug logging (default: false)
   */
  debug?: boolean;
}

/**
 * Combines a type T with RPC client options
 */
export type RpcClient<T> = T & RpcClientOptions;

/**
 * Dictionary of methods that can be registered with the RPC system
 */
export type MethodDictionary<T> = { [K in keyof T]: (...args: any[]) => any };

/**
 * Turns a `Promise<R>` type into simply `R`.
 *
 * If the original type T is not't return a Promise, it remains unchanged.
 */
export type Promisify<T> = T extends Promise<unknown> ? T : Promise<T>;

// @TODO: understand why the code below does not work
//
/**
 * Wraps a function's return type with a Promise if it's not already a Promise
 */
export type MakeFnAsync<T> = T extends (
  ...args: infer TParams
) => infer TMaybePromise
  ? TMaybePromise extends Promise<unknown>
    ? T
    : (...args: TParams) => Promise<TMaybePromise>
  : T;

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

/**
 * Unwraps a function that returns a Promise to return the direct value
 */
export type MakeFnSync<T> = T extends (
  ...args: infer TParams
) => Promise<infer R>
  ? (...args: TParams) => R
  : T;

/**
 * Makes all the functions in T synchronous.
 *
 * If the original function returns a Promise<R>, this type converts it to a function returning R.
 * If the original function doesn't return a Promise, it remains unchanged.
 *
 * @template T - The object type containing functions to be converted.
 */
export type MakeAllFnSync<T> = { [K in keyof T]: MakeFnSync<T[K]> };

/**
 * Alias for {@link MakeSync}
 */
export type Synchronize<T> = MakeSync<T>;
