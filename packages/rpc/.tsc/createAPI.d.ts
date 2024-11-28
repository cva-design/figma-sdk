import type { ApiMethodsDictionary, MakeAllFnAsync, RpcClientOptions } from './types';
export type { RpcClientOptions as Options } from './types';
export declare function createAPI<T extends ApiMethodsDictionary>(methods: T, options?: RpcClientOptions): MakeAllFnAsync<T>;
//# sourceMappingURL=createAPI.d.ts.map