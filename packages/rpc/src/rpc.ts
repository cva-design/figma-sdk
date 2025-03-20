import {
  type ExtendedJsonRpcRequest,
  InternalError,
  InvalidRequest,
  MethodNotFound,
  RpcError,
} from './errors';
import type { InternalMethodError, JsonRpcRequest, JsonValue } from './types';
import { isPromise, toJsonObject } from './utils';

// Debug flag - set to true to enable verbose logging
let DEBUG_RPC = false;

/**
 * Logs debug information if DEBUG_RPC is enabled
 */
function debugLog(...args: any[]): void {
  if (DEBUG_RPC) {
    console.log('[RPC Debug]', ...args);
  }
}

/**
 * Function for sending raw JSON-RPC messages
 * This is platform-specific and initialized during setup
 */
export let sendRaw: (message: JsonRpcRequest) => void;

// Platform detection and initialization
if (typeof figma !== 'undefined') {
  figma.ui.on('message', (message: JsonRpcRequest) => handleRaw(message));
  sendRaw = (message) => {
    figma.ui.postMessage(message);
  };
} else if (typeof parent !== 'undefined') {
  window.addEventListener('message', (event) =>
    handleRaw(event.data.pluginMessage),
  );
  sendRaw = (message) => parent.postMessage({ pluginMessage: message }, '*');
}

// Request counter for generating unique IDs
let rpcIndex = 0;

// Storage for pending requests and their callbacks
const pending: {
  [key: string]: {
    (err?: InternalMethodError, result?: JsonValue): JsonValue;
    timeout: NodeJS.Timeout;
  };
} = {};

/**
 * Sends a JSON-RPC request
 *
 * @param req - The JSON-RPC request object to send
 */
function sendJson(req: JsonRpcRequest): void {
  try {
    debugLog('Sending JSON:', req);
    sendRaw(req);
  } catch (err) {
    console.error('Error sending JSON:', err);
    console.error('Request was:', req);
  }
}

/**
 * Sends a successful result for a JSON-RPC request
 *
 * @param json - The original request
 * @param result - The result to send back
 */
function sendResult(json: JsonRpcRequest, result: JsonValue) {
  sendJson({
    ...json,
    result,
  });
}

/**
 * Sends an error response for a JSON-RPC request
 *
 * @param json - The original request
 * @param error - The error that occurred
 */
function sendError(json: JsonRpcRequest, error: Error) {
  const errorObj = {
    code: error instanceof RpcError ? error.statusCode : -32000,
    message: error.message,
    name: error.name,
  };

  // Add detailed information for RPC errors
  if (error instanceof RpcError) {
    // Add data from the RPC error for debugging
    Object.assign(errorObj, {
      data: error.data,
      detailedMessage: error.getDetailedMessage(),
    });
  }

  sendJson({
    ...json,
    error: errorObj,
  });
}

/**
 * Handles a raw incoming message
 *
 * @param data - The raw message data
 */
export function handleRaw(data: JsonRpcRequest) {
  try {
    if (!data) {
      return;
    }

    handleRpc(data);
  } catch (err) {
    console.error(err);
    console.error(data);
  }
}

/**
 * Processes a JSON-RPC message
 *
 * @param rpcRequest - The JSON-RPC request object
 */
function handleRpc(rpcRequest: JsonRpcRequest) {
  if (typeof rpcRequest.id !== 'undefined') {
    if (
      typeof rpcRequest.result !== 'undefined' ||
      rpcRequest.error ||
      typeof rpcRequest.method === 'undefined'
    ) {
      if (!pending[rpcRequest.id]) {
        console.error(
          `No pending request found for ID ${rpcRequest.id}`,
          rpcRequest,
        );
        sendError(
          rpcRequest,
          new InvalidRequest({
            ...rpcRequest,
            details: `No pending request found for ID ${rpcRequest.id}`,
          } as ExtendedJsonRpcRequest),
        );
        return;
      }
      const callback = pending[rpcRequest.id];
      // @ts-ignore
      if (callback.timeout) {
        // @ts-ignore
        clearTimeout(callback.timeout);
      }
      delete pending[rpcRequest.id];
      callback(rpcRequest.error, rpcRequest.result);
    } else {
      handleRequest(rpcRequest);
    }
  } else {
    handleNotification(rpcRequest);
  }
}

// Registry of available methods
let methods: Record<string, (...args: JsonValue[]) => JsonValue> = {};

/**
 * Checks if a method is registered
 *
 * @param methodName - The name of the method to check
 * @returns True if the method is registered, false otherwise
 */
function isMethodRegistered(methodName: string): boolean {
  return Boolean(methods[methodName]);
}

/**
 * Lists all registered methods
 *
 * @returns Array of method names
 */
function listRegisteredMethods(): string[] {
  return Object.keys(methods);
}

/**
 * Executes a method with the given parameters
 *
 * @param method - The name of the method to call
 * @param params - The parameters to pass to the method
 * @returns The result of the method call
 * @throws {MethodNotFound} If the method is not registered
 */
function onRequest(method: string, params: JsonValue[]) {
  if (!isMethodRegistered(method)) {
    console.error(
      `Method "${method}" not found. Available methods:`,
      listRegisteredMethods(),
    );
    throw new MethodNotFound({
      method,
      params,
      availableMethods: listRegisteredMethods(),
      details: `The method "${method}" is not registered. Available methods: ${listRegisteredMethods().join(', ')}`,
    });
  }
  return methods[method](...params);
}

/**
 * Handles a notification (a request without an ID)
 *
 * @param json - The notification request
 */
function handleNotification(json: JsonRpcRequest) {
  if (!json.method) {
    return;
  }
  onRequest(json.method, json.params ?? []);
}

/**
 * Handles a request with an ID (expecting a response)
 *
 * @param rpcReq - The request object
 */
function handleRequest(rpcReq: JsonRpcRequest) {
  if (!rpcReq.method) {
    console.error('Request missing method:', rpcReq);
    sendError(
      rpcReq,
      new MethodNotFound({
        method: rpcReq.method,
        params: rpcReq.params,
        details: 'Request is missing a method name',
      }),
    );
    return;
  }
  try {
    const result = onRequest(rpcReq.method, rpcReq.params ?? []);
    if (isPromise(result)) {
      result
        .then((res: JsonValue) => sendResult(rpcReq, res))
        .catch((err: Error) => {
          console.error(`Error in async method "${rpcReq.method}":`, err);
          sendError(rpcReq, err);
        });
    } else {
      sendResult(rpcReq, result);
    }
  } catch (err) {
    console.error(`Error executing method "${rpcReq.method}":`, err);
    sendError(rpcReq, err as Error);
  }
}

/**
 * Initialize the RPC system with the provided API methods
 *
 * @param apiInstance - Object containing the API methods to register
 * @param options - Configuration options
 * @param options.debug - Enable debug logging (default: false)
 */
export const init = <T extends Record<string, (...args: any[]) => any>>(
  apiInstance: T,
  options?: { debug?: boolean },
) => {
  // Set debug mode if specified in options
  if (options?.debug !== undefined) {
    DEBUG_RPC = options.debug;
  }

  debugLog('Initializing RPC with methods:', Object.keys(apiInstance));
  methods = apiInstance as Record<string, (...args: JsonValue[]) => JsonValue>;
};

/**
 * Sends a JSON-RPC request and returns a promise for the result
 *
 * @param method - The name of the method to call
 * @param params - The parameters to pass to the method
 * @param timeout - Optional timeout in milliseconds
 * @returns A promise that resolves with the result or rejects with an error
 */
export const sendRequest = (
  method: string,
  params: JsonValue[] = [],
  timeout?: number,
): Promise<JsonValue> =>
  new Promise((resolve, reject) => {
    const id = rpcIndex;
    const req: JsonRpcRequest = { jsonrpc: '2.0', method, params, id };
    rpcIndex += 1;

    debugLog(`Sending request #${id}:`, method, params);

    const callback = (err?: InternalMethodError, result?: JsonValue) => {
      if (err) {
        debugLog(`Error in request #${id}:`, err);
        console.error(`RPC Error in method "${method}":`, err);

        // If it's already an RPC error, pass it through
        if (err instanceof RpcError) {
          reject(err);
          return;
        }

        // If it's a standard error object with a name property
        if (err && typeof err === 'object' && 'name' in err) {
          // Handle specific error types
          if (err.name === 'MethodNotFound') {
            reject(
              new MethodNotFound({
                method,
                params,
                details: `The method "${method}" is not registered on the receiving end.`,
              }),
            );
            return;
          }

          if (err.name === 'InvalidRequest') {
            reject(
              new InvalidRequest({
                ...req,
                error: err,
                details: `Invalid request for method "${method}".`,
              } as ExtendedJsonRpcRequest),
            );
            return;
          }
        }

        // For any other error, wrap it in an InternalError
        reject(
          new InternalError({
            originalError: toJsonObject(err),
            method,
            params: params.map((p) =>
              typeof p === 'object' ? '(complex object)' : p,
            ),
            message: err.message || 'Unknown error',
          }),
        );
        return;
      }
      debugLog(`Request #${id} succeeded:`, result);
      resolve(result);
      return result;
    };

    // set a default timeout
    callback.timeout = setTimeout(() => {
      delete pending[id];
      reject(
        new Error(`Request "${method}" timed out after ${timeout || 6000}ms.`),
      );
    }, timeout || 6000);

    pending[id] = callback;
    sendJson(req);
  });

// export { RPCError };
