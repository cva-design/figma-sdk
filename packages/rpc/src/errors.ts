///<reference types="node" />
import type { JsonObject, JsonRpcRequest } from "./types";
import { isFunction, toJsonObject, toJsonValue } from "./utils";

export abstract class RpcError extends Error {
	data: JsonObject;
	abstract statusCode: number;

	constructor(data: JsonObject, message: string) {
		super(message);
		this.name = this.constructor.name;
		this.data = data;

		if (isFunction(Error.captureStackTrace)) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = new Error(message).stack;
		}
	}
}

export class ParseError extends RpcError {
	override statusCode = -32700;
	constructor(data: JsonObject) {
		super(data, "Parse error");
	}
}

export class InvalidRequest extends RpcError {
	override statusCode = -32600;
	constructor(data: JsonRpcRequest) {
		super(toJsonObject(data), "Invalid Request");
	}
}

export class MethodNotFound extends RpcError {
	statusCode = -32601;
	constructor(data: JsonObject) {
		super(data, "Method not found");
	}
}

export class InvalidParams extends RpcError {
	override statusCode = -32602;
	constructor(data: JsonObject) {
		super(data, "Invalid params");
	}
}

export class InternalError extends RpcError {
	override statusCode = -32603;
	constructor(data: JsonObject) {
		super(data, "Internal error");
	}
}
