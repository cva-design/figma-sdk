import { sendRequest } from './rpc';
import type { MethodDictionary, RpcClient, RpcOptions } from './types';

/**
 * Creates an RPC client for calling methods on the other side
 *
 * @param options - Configuration options
 * @param options.timeout - Request timeout in milliseconds (default: 6000)
 * @param options.debug - Enable debug logging (default: false)
 * @param options.serializer - Optional custom serializer/deserializer
 * @returns A proxy object that implements the API interface
 */
export const createClient = <T extends MethodDictionary<T>>(
  options?: RpcOptions,
) => {
  const client = {} as unknown as RpcClient<T>;
  // const methodNames = options && options.serializer ? [] : undefined; // Used if no serializer

  // Use Proxy to dynamically create methods that call sendRequest
  return new Proxy(client, {
    get(_target, prop: string) {
      // Don't proxy internal properties or symbols
      if (
        typeof prop !== 'string' ||
        prop === 'then' ||
        prop === 'constructor'
      ) {
        return undefined;
      }

      // Return a function that calls sendRequest with the method name (prop)
      return (...args: any[]) =>
        sendRequest(
          prop, // The method name
          args, // The arguments passed to the method
          options?.timeout, // Pass timeout from createClient options
          {
            // Pass options object to sendRequest
            serializer: options?.serializer,
            sendRawOverride: options?.sendRawOverride,
          },
        );
    },
  }) as RpcClient<T>;
};
