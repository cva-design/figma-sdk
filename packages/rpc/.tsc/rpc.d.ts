import type { ApiMethodsDictionary, JsonRpcRequest, JsonValue } from './types';
export declare let sendRaw: (message: JsonRpcRequest) => void;
export declare function handleRaw(data: JsonRpcRequest): void;
export declare const init: (apiInstance: ApiMethodsDictionary) => void;
export declare const sendRequest: (method: string, params?: JsonValue[], timeout?: number) => Promise<JsonValue>;
//# sourceMappingURL=rpc.d.ts.map