import type { JsonObject, JsonRpcRequest } from './types';
export declare abstract class RpcError extends Error {
    data: JsonObject;
    abstract statusCode: number;
    constructor(data: JsonObject, message: string);
}
export declare class ParseError extends RpcError {
    statusCode: number;
    constructor(data: JsonObject);
}
export declare class InvalidRequest extends RpcError {
    statusCode: number;
    constructor(data: JsonRpcRequest);
}
export declare class MethodNotFound extends RpcError {
    statusCode: number;
    constructor(data: JsonObject);
}
export declare class InvalidParams extends RpcError {
    statusCode: number;
    constructor(data: JsonObject);
}
export declare class InternalError extends RpcError {
    statusCode: number;
    constructor(data: JsonObject);
}
//# sourceMappingURL=errors.d.ts.map