import { init, sendRequest } from './rpc';
import type {
  JsonValue,
  MakeAllFnAsync,
  MakeFnAsync,
  RpcClientOptions,
} from './types';

/**
 * Lists all public methods of a class
 *
 * @param classConstructor - The class constructor to inspect
 * @returns Array of method names
 */
function listMethods(classConstructor: NewableFunction): string[] {
  const prototype = classConstructor.prototype;
  const props = Object.getOwnPropertyNames(prototype);

  const methods = props.filter((prop) => {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);

    if (
      !descriptor ||
      prop === 'constructor' ||
      prop.startsWith('_') ||
      prop.startsWith('#')
    ) {
      return false;
    }

    return (
      typeof descriptor.value === 'function' && descriptor.enumerable === true
    );
  });

  return methods;
}

/**
 * Creates an RPC client for calling methods on the other side
 *
 * @param stubClass - The class constructor defining the API interface
 * @param options - Configuration options
 * @param options.timeout - Request timeout in milliseconds (default: 6000)
 * @param options.debug - Enable debug logging (default: false)
 * @returns A proxy object that implements the API interface
 */
export function createClient<T extends new (...args: unknown[]) => unknown>(
  stubClass: T,
  options?: RpcClientOptions,
): MakeAllFnAsync<InstanceType<T>> {
  const timeout = options?.timeout;

  // Enable debug mode if specified
  if (options?.debug) {
    init({}, { debug: true });
  }

  const methods = listMethods(stubClass);
  const stub = {} as MakeAllFnAsync<InstanceType<T>>;

  for (const method of methods) {
    const methodFn = (...params: JsonValue[]) =>
      sendRequest(method, params, timeout);
    stub[method as keyof typeof stub] = methodFn as MakeFnAsync<
      InstanceType<T>[keyof InstanceType<T>]
    >;
  }

  return stub;
}
