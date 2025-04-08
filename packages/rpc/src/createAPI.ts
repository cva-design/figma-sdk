import { init } from './rpc';
import type { MakeAllFnAsync, MethodDictionary, RpcOptions } from './types';
export type { RpcOptions as RpcClientOptions } from './types';

/**
 * Creates an API instance for RPC communication
 *
 * @param methods - Object containing the API methods to register
 * @param options - Configuration options
 * @param options.timeout - Request timeout in milliseconds (default: 6000)
 * @param options.debug - Enable debug logging (default: false)
 * @param options.serializer - Optional custom serializer/deserializer
 * @returns A proxy object that wraps the API methods
 */
export function createAPI<T extends MethodDictionary<T>>(
  methods: T,
  options?: RpcOptions,
): MakeAllFnAsync<T> {
  // Initialize the RPC system with the provided methods and options
  // This step is crucial - all method calls will be queued until this happens
  init(methods, options);

  const stub = {} as MakeAllFnAsync<T>;

  // Create wrapper functions that exactly match the original function signatures
  for (const p in methods) {
    if (methods[p] !== undefined) {
      stub[p as keyof T] = ((...params: any[]) => {
        try {
          // Call the original method and preserve its promise chain
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          const result = methods[p]!(...params);
          return result; // Will automatically be Promise<T> if method returns Promise<T>
        } catch (err) {
          console.error(`Error in API method "${p}":`, err);
          throw err; // Rethrow to maintain error behavior
        }
      }) as any;
    }
  }

  return stub;
}
