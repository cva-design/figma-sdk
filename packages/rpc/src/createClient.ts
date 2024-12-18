import { sendRequest } from './rpc';
import type {
  JsonValue,
  MakeAllFnAsync,
  MakeFnAsync,
  RpcClientOptions,
} from './types';

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

export function createClient<T extends new (...args: unknown[]) => unknown>(
  stubClass: T,
  options?: RpcClientOptions,
): MakeAllFnAsync<InstanceType<T>> {
  const timeout = options?.timeout;
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
