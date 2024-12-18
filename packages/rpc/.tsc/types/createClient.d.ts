import type { MakeAllFnAsync, RpcClientOptions } from './types';
export declare function createClient<T extends new (...args: unknown[]) => unknown>(stubClass: T, options?: RpcClientOptions): MakeAllFnAsync<InstanceType<T>>;
//# sourceMappingURL=createClient.d.ts.map