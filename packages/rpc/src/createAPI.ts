import { init } from './rpc';
import type {
  ApiMethodsDictionary,
  MakeAllFnAsync,
  RpcClientOptions,
} from './types';
export type { RpcClientOptions as Options } from './types';

export function createAPI<T extends ApiMethodsDictionary>(
  methods: T,
  options?: RpcClientOptions,
): MakeAllFnAsync<T> {
  // const timeout = options && options.timeout;

  init(methods);

  const stub = {} as MakeAllFnAsync<T>;

  for (const p in methods) {
    // @ts-ignore
    stub[p] = (...params) => methods[p](...params);
  }

  return stub;
}

// export function createUIAPI<T extends Record<string, (...args: any[]) => any>>(
//   methods: T,
//   options?: Options
// ) {
//   const timeout = options && options.timeout;

//   if (typeof parent !== 'undefined') {
//     setup(methods);
//   }

//   return Object.keys(methods).reduce((prev, p) => {
//     //@ts-ignore
//     prev[p] = (...params: Parameters<T[keyof T]>) => {
//       if (typeof parent !== 'undefined') {
//         return Promise.resolve().then(() => methods[p](...params));
//       }
//       return sendRequest(p, params, timeout);
//     };
//     return prev;
//   }, {} as Methods<T>);
// }

// export function createPluginAPI<T extends Record<string, (...args: any[]) => any>>(
//   methods: T,
//   options?: Options
// ) {
//   const timeout = options && options.timeout;

//   if (typeof figma !== 'undefined') {
//     setup(methods);
//   }

//   return Object.keys(methods).reduce((prev, p) => {
//     // @ts-ignore
//     prev[p] = (...params: Parameters<T[keyof T]>) => {
//       if (typeof figma !== 'undefined') {
//         return Promise.resolve().then(() => methods[p](...params));
//       }
//       return sendRequest(p, params, timeout);
//     };
//     return prev;
//   }, {} as Methods<T>);
// }

// type MethodFunction = (...params: any[]) => any;
// type Methods<T> = { [K in keyof T]: MethodFunction };
