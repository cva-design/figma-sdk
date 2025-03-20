import { init, sendRequest } from './rpc';
import type { JsonValue, MakeAllFnAsync, RpcClientOptions } from './types';

/**
 * Creates an RPC client for calling methods on the other side
 *
 * @param options - Configuration options
 * @param options.timeout - Request timeout in milliseconds (default: 6000)
 * @param options.debug - Enable debug logging (default: false)
 * @returns A proxy object that implements the API interface
 */
export function createClient<T extends object>(
  options?: RpcClientOptions,
): MakeAllFnAsync<T> {
  // Enable debug mode if specified
  if (options?.debug) {
    init({}, { debug: true });
  }

  // Create a proxy that dynamically handles method calls
  return new Proxy({} as MakeAllFnAsync<T>, {
    get: (_target, prop) => {
      // Skip the "then" method to ensure the proxy is not treated as a thenable
      if (typeof prop === 'string' && prop !== 'then') {
        return (...params: JsonValue[]) =>
          sendRequest(prop, params, options?.timeout);
      }
      return undefined;
    },
  });
}
