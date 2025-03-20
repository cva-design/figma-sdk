///<reference types="node" />
import type { JsonObject, JsonRpcRequest } from './types';
import { isFunction, toJsonObject } from './utils';

/**
 * Base class for all RPC errors
 *
 * Extends the Error class with additional properties for JSON-RPC error handling
 */
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

  /**
   * Returns a formatted error message with details
   */
  getDetailedMessage(): string {
    const details = this.data.details ? `\nDetails: ${this.data.details}` : '';
    const method = this.data.method ? `\nMethod: ${this.data.method}` : '';
    const params = this.data.params
      ? `\nParams: ${JSON.stringify(this.data.params, null, 2)}`
      : '';

    return `${this.message} (${this.statusCode})${method}${details}${params}`;
  }
}

export interface ExtendedJsonRpcRequest extends JsonRpcRequest {
  details?: string;
  availableMethods?: string[];
  error?: any;
}

/**
 * Error for JSON parsing failures
 *
 * Standard JSON-RPC error code: -32700
 */
export class ParseError extends RpcError {
  override statusCode = -32700;
  constructor(data: JsonObject) {
    super(data, 'Parse error');
  }
}

/**
 * Error for invalid JSON-RPC requests
 *
 * Standard JSON-RPC error code: -32600
 */
export class InvalidRequest extends RpcError {
  override statusCode = -32600;
  constructor(data: ExtendedJsonRpcRequest) {
    const message = 'Invalid Request';
    const jsonData = toJsonObject(data);

    // Extract the most relevant information for the error message
    const errorDetails = data.error
      ? `\nUnderlying error: ${data.error.name || 'Unknown'}: ${data.error.message || 'No message'}`
      : '';

    const details = data.details ? `\n${data.details}` : '';

    super(jsonData, `${message}${errorDetails}${details}`);
  }
}

/**
 * Error for method not found in the RPC server
 *
 * Standard JSON-RPC error code: -32601
 */
export class MethodNotFound extends RpcError {
  statusCode = -32601;
  constructor(
    data: JsonObject & { details?: string; availableMethods?: string[] },
  ) {
    const methodName = data.method || 'unknown';
    const details = data.details ? `\n${data.details}` : '';
    super(data, `Method not found: "${methodName}"${details}`);
  }
}

/**
 * Error for invalid parameters passed to a method
 *
 * Standard JSON-RPC error code: -32602
 */
export class InvalidParams extends RpcError {
  override statusCode = -32602;
  constructor(data: JsonObject) {
    const methodName = data.method || 'unknown';
    super(data, `Invalid params for method: "${methodName}"`);
  }
}

/**
 * Error for internal server errors during method execution
 *
 * Standard JSON-RPC error code: -32603
 */
export class InternalError extends RpcError {
  override statusCode = -32603;
  constructor(data: JsonObject) {
    const message = data.message
      ? `Internal error: ${data.message}`
      : 'Internal error';
    const methodInfo = data.method ? ` in method "${data.method}"` : '';
    super(data, `${message}${methodInfo}`);
  }
}
