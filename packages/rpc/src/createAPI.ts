import { init } from './rpc';
import type { MakeAllFnAsync, RpcClientOptions } from './types';
export type { RpcClientOptions } from './types';

/**
 * Creates an API instance for RPC communication
 *
 * @param methods - Object containing the API methods to register
 * @param options - Configuration options
 * @param options.timeout - Request timeout in milliseconds (default: 6000)
 * @param options.debug - Enable debug logging (default: false)
 * @returns A proxy object that wraps the API methods
 */
export function createAPI<T extends Record<string, (...args: any[]) => any>>(
  methods: T,
  options?: RpcClientOptions,
): MakeAllFnAsync<T> {
  // Initialize the RPC system with the provided methods and options
  init(methods, { debug: options?.debug });

  const stub = {} as MakeAllFnAsync<T>;

  for (const p in methods) {
    // @ts-ignore
    stub[p] = (...params) => methods[p](...params);
  }

  return stub;
}
