import {
  type ExtendedJsonRpcRequest,
  InternalError,
  InvalidRequest,
  MethodNotFound,
  RpcError,
} from './errors';
import type {
  InternalMethodError,
  JsonRpcRequest,
  JsonValue,
  MethodDictionary,
} from './types';
import { isPromise, toJsonObject } from './utils';

// Debug flag - set to true to enable verbose logging
let DEBUG_RPC = false;

// Track initialization status
let IS_INITIALIZED = false;

// Maps of request IDs to pending callbacks
const pendingRequestMap = new Map<number, string>();

// Set to track IDs we've already processed to prevent loops
const processedResponseIds = new Set<number>();

// Queue for requests that arrive before initialization
const pendingMethodCalls: {
  method: string;
  params: JsonValue[];
  reqId: number;
}[] = [];

// Track the last message received to prevent duplicate processing
let lastMessageReceived: string = '';

// Track if event listeners are initialized
let isEventListenersInitialized = false;

// Client ID counter for distinguishing between clients
let clientIdCounter = 0;

// Current client ID
let currentClientId: string;

function getNewClientId() {
  clientIdCounter += 1;
  return typeof figma === 'undefined'
    ? `app-${clientIdCounter}`
    : `code-${clientIdCounter}`;
}

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

/**
 * Sets up event listeners for messages based on the environment
 */
function setupEventListeners() {
  if (isEventListenersInitialized) {
    return; // Only set up event listeners once
  }

  if (typeof figma !== 'undefined') {
    // Figma plugin side
    figma.ui.on('message', (message: JsonRpcRequest) => {
      try {
        // Prevent the sender from processing its own messages
        if (message.clientId !== currentClientId) {
          // Prevent duplicate message processing
          const msgStr = JSON.stringify(message);
          if (msgStr === lastMessageReceived) {
            debugLog('Ignoring duplicate message from App');
            return;
          }
          lastMessageReceived = msgStr;

          debugLog(`📩 Received from ${message?.clientId || 'App'}:`, message);
          handleRaw(message);
        }
      } catch (err) {
        console.error(
          `Error handling message from ${message?.clientId || 'App'}:`,
          err,
        );
      }
    });

    sendRaw = (message) => {
      // Add current client ID to outgoing messages
      message.clientId = currentClientId;
      debugLog('📤 Sending to App:', message);
      figma.ui.postMessage(message);
    };
  } else if (typeof parent !== 'undefined') {
    // UI side
    window.addEventListener('message', (event) => {
      try {
        if (!event.data || !event.data.pluginMessage) {
          return; // Not a message from the plugin
        }

        const message = event.data.pluginMessage;

        // Prevent the sender from processing its own messages
        if (message.clientId !== currentClientId) {
          // Prevent duplicate message processing
          const msgStr = JSON.stringify(message);
          if (msgStr === lastMessageReceived) {
            debugLog('Ignoring duplicate message from Plugin');
            return;
          }
          lastMessageReceived = msgStr;

          debugLog(`📩 Received from ${message.clientId}:`, message);

          handleRaw(message);
        }
      } catch (err) {
        console.error(
          `Error handling message from ${event?.data?.pluginMessage?.clientId || 'Plugin'}:`,
          err,
        );
      }
    });

    sendRaw = (message) => {
      // Add current client ID to outgoing messages
      message.clientId = currentClientId;
      debugLog('📤 Sending to Plugin:', message);
      parent.postMessage({ pluginMessage: message }, '*');
    };
  }

  isEventListenersInitialized = true;
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
  // Prevent sending errors for already processed IDs
  // This is a key defense against infinite loops
  if (req.error && processedResponseIds.has(req.id)) {
    console.warn(`Prevented error response loop for ID ${req.id}`);
    return;
  }

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
  // CRITICAL: Never send error responses for unknown requests
  // This prevents infinite loops
  if (!pending[json.id] && json.id !== undefined) {
    console.warn(`Prevented error response for unknown request ID ${json.id}`);
    return;
  }

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

    // Skip processing if we've already processed this exact response
    if (
      data.id !== undefined &&
      (data.result !== undefined || data.error) &&
      processedResponseIds.has(data.id)
    ) {
      debugLog(`Skipping already processed response for ID ${data.id}`);
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
  // Handle duplicate responses only once
  if (
    typeof rpcRequest.id !== 'undefined' &&
    (typeof rpcRequest.result !== 'undefined' || rpcRequest.error) &&
    processedResponseIds.has(rpcRequest.id)
  ) {
    console.warn(`Ignoring duplicate response for ID ${rpcRequest.id}`);
    return;
  }

  if (typeof rpcRequest.id !== 'undefined') {
    if (
      typeof rpcRequest.result !== 'undefined' ||
      rpcRequest.error ||
      typeof rpcRequest.method === 'undefined'
    ) {
      // Mark this ID as processed to prevent loops
      if (rpcRequest.id !== undefined) {
        processedResponseIds.add(rpcRequest.id);

        // Cleanup processed IDs after a while (prevent memory leak)
        setTimeout(() => {
          processedResponseIds.delete(rpcRequest.id);
        }, 10000);
      }

      // Handle response to a request
      if (!pending[rpcRequest.id]) {
        // NEVER send an error back for unknown requests - just log it
        const methodInfo = pendingRequestMap.get(rpcRequest.id) || 'unknown';

        // In debug mode, provide more information
        if (DEBUG_RPC) {
          console.warn(
            `No pending request found for ID ${rpcRequest.id} (method: ${methodInfo})`,
          );
          console.warn(
            'This often happens when responses are processed twice.',
          );
          console.warn(
            `Current pending requests: ${Object.keys(pending).join(', ') || 'none'}`,
          );
        } else {
          // In production, just log a simple warning
          console.warn(`No pending request found for ID ${rpcRequest.id}`);
        }

        return; // Critical: Stop processing here
      }

      const callback = pending[rpcRequest.id];
      // @ts-ignore
      if (callback.timeout) {
        // @ts-ignore
        clearTimeout(callback.timeout);
      }

      // Clean up pending requests
      delete pending[rpcRequest.id];
      pendingRequestMap.delete(rpcRequest.id);

      callback(rpcRequest.error, rpcRequest.result);
    } else {
      // If method call comes before initialization, queue it
      if (!IS_INITIALIZED && rpcRequest.method) {
        if (DEBUG_RPC) {
          console.log(
            `Queueing method call "${rpcRequest.method}" until initialization`,
          );
        }

        // Store the request to process later
        pendingMethodCalls.push({
          method: rpcRequest.method,
          params: rpcRequest.params || [],
          reqId: rpcRequest.id,
        });

        return;
      }

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
 * Processes any queued method calls that arrived before initialization
 */
function processQueuedMethodCalls() {
  if (pendingMethodCalls.length > 0) {
    debugLog(`Processing ${pendingMethodCalls.length} queued method calls`);

    // Process each queued call
    for (const { method, params, reqId } of pendingMethodCalls) {
      const rpcReq: JsonRpcRequest = {
        jsonrpc: '2.0',
        method,
        params,
        id: reqId,
      };

      handleRequest(rpcReq);
    }

    // Clear the queue
    pendingMethodCalls.length = 0;
  }
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

  // Queue notifications if not initialized
  if (!IS_INITIALIZED) {
    if (DEBUG_RPC) {
      console.log(
        `Queueing notification "${json.method}" until initialization`,
      );
    }

    pendingMethodCalls.push({
      method: json.method,
      params: json.params || [],
      reqId: -1, // Use -1 for notifications
    });

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
export const init = <T extends MethodDictionary<T>>(
  apiInstance: T,
  options?: { debug?: boolean },
) => {
  // Set debug mode if specified in options
  if (options?.debug !== undefined) {
    DEBUG_RPC = options.debug;
  }

  // Generate a new client ID for each initialization
  currentClientId = getNewClientId();

  // Set up event listeners if not already done
  setupEventListeners();

  debugLog(
    `Initializing RPC client #${currentClientId} with methods:`,
    Object.keys(apiInstance),
  );

  // Register the methods
  methods = apiInstance as Record<string, (...args: JsonValue[]) => JsonValue>;

  // Mark as initialized
  IS_INITIALIZED = true;

  // Process any queued method calls
  processQueuedMethodCalls();
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
    const req: JsonRpcRequest = {
      jsonrpc: '2.0',
      method,
      params,
      id,
      clientId: currentClientId,
    };
    rpcIndex += 1;

    // Track method name for better error messages
    pendingRequestMap.set(id, method);

    debugLog(
      `Sending request #${id} (client #${currentClientId}):`,
      method,
      params,
    );

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
      pendingRequestMap.delete(id);
      reject(
        new Error(`Request "${method}" timed out after ${timeout || 6000}ms.`),
      );
    }, timeout || 6000);

    pending[id] = callback;
    sendJson(req);
  });

// export { RPCError };
