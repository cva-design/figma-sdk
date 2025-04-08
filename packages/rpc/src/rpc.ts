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
  RpcOptions,
  SendRawFunc,
  Serializer,
} from './types';
import { toJsonObject } from './utils';

// Debug flag - set to true to enable verbose logging
let DEBUG_RPC = false;

// Track initialization status
let IS_INITIALIZED = false;

// Maps of request IDs to pending callbacks
let pendingRequestMap = new Map<number, string>();

// Set to track IDs we've already processed to prevent loops
let processedResponseIds = new Set<number>();

// Queue for requests that arrive before initialization
let pendingMethodCalls: {
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

// Store the serializer provided during init
let apiSerializer: Serializer | undefined;

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
    debugLog(
      '[RPC Internal Log] setupEventListeners: Already initialized, skipping.',
    );
    return;
  }
  debugLog('[RPC Internal Log] setupEventListeners: Proceeding with setup...');

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

    // Always define sendRaw here
    const currentUi = figma.ui; // Capture the reference
    sendRaw = (message) => {
      message.clientId = currentClientId;
      debugLog('📤 Sending to Figma UI via currentUi.postMessage:', message);
      // Use the captured reference
      if (currentUi) {
        // Simple check if needed, though it should exist here
        currentUi.postMessage(message); // This should call postMessageMock
      } else {
        console.error('Cannot send message: currentUi reference was lost.');
      }
    };
  } else if (typeof parent !== 'undefined' && typeof window !== 'undefined') {
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

    // Always define sendRaw here
    sendRaw = (message) => {
      message.clientId = currentClientId;
      debugLog('📤 Sending to Plugin via parent.postMessage:', message);
      parent.postMessage({ pluginMessage: message }, '*');
    };
  } else {
    // debugLog('[RPC Test Log] setupEventListeners: No environment detected.');
  }

  isEventListenersInitialized = true;
}

// Request counter for generating unique IDs
let rpcIndex = 0;

// Storage for pending requests and their callbacks
const pending: {
  [key: string]: {
    (err?: InternalMethodError, result?: JsonValue): void;
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
  // Construct the response explicitly, using currentClientId
  const response: JsonRpcRequest = {
    jsonrpc: '2.0',
    id: json.id, // Use the ID from the original request
    result,
    clientId: currentClientId, // Use the instance's client ID
  };
  sendJson(response);
}

/**
 * Sends an error response for a JSON-RPC request
 *
 * @param json - The original request
 * @param error - The error that occurred
 */
// Export for testing purposes
export function sendError(json: JsonRpcRequest, error: Error) {
  // CRITICAL: Only prevent sending errors for notifications (requests without an ID)
  // This prevents infinite loops if a notification itself causes an error.
  if (json.id === undefined || json.id === null) {
    console.warn(
      `Prevented sending error for notification (no ID): ${error.message}`,
    );
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

  // Construct the response explicitly, using currentClientId
  const response: JsonRpcRequest = {
    jsonrpc: '2.0',
    id: json.id, // Use the ID from the original request
    error: errorObj,
    clientId: currentClientId, // Use the instance's client ID
  };
  sendJson(response);
}

/**
 * Handles a raw incoming message
 *
 * @param data - The raw message data
 */
export function handleRaw(data: JsonRpcRequest | string) {
  try {
    if (!data) {
      return;
    }

    let rpcRequest: JsonRpcRequest;

    try {
      // Check if data is already an object (likely if it came directly from figma.ui.on)
      // or needs parsing (if it came from window.postMessage event.data)
      if (typeof data === 'string') {
        // Use deserializer *reviver* if available // <-- REMOVED Serializer from here
        rpcRequest = JSON.parse(data); // Just parse, deserialization happens in onRequest
      } else if (typeof data === 'object' && data !== null) {
        // If it's an object, assume it's already the parsed request
        rpcRequest = data as JsonRpcRequest; // Cast to JsonRpcRequest
      } else {
        console.error('Received invalid message data type:', typeof data);
        // Maybe send InvalidRequest error? Depends on requirements. For now, just return.
        return;
      }
    } catch (err) {
      console.error('Error parsing incoming message:', err);
      return;
    }

    // Skip processing if we've already processed this exact response
    if (
      rpcRequest.id !== undefined &&
      (rpcRequest.result !== undefined || rpcRequest.error) &&
      processedResponseIds.has(rpcRequest.id)
    ) {
      debugLog(`Skipping already processed response for ID ${rpcRequest.id}`);
      return;
    }

    handleRpc(rpcRequest);
  } catch (err) {
    if (!DEBUG_RPC && err instanceof Error) {
      console.error(`Error in handleRaw: ${err.message}`);
    } else {
      console.error('Error in handleRaw:', err);
      console.error('Original data:', data);
    }
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
export function isMethodRegistered(methodName: string): boolean {
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
 * Handles an incoming request
 * @param method The method name
 * @param params The parameters (potentially serialized as a single string)
 * @param rpcRequest The full incoming RPC request object
 * @returns The result of the method call
 */
function onRequest(
  method: string,
  params: JsonValue[] | JsonValue,
  rpcRequest: JsonRpcRequest,
): JsonValue | Promise<JsonValue> {
  const handler = methods[method];

  if (!handler) {
    throw new MethodNotFound({
      method,
      params,
      availableMethods: listRegisteredMethods(),
      details: `The method "${method}" is not registered. Available methods: ${listRegisteredMethods().join(', ')}`,
    });
  }

  let finalParams: JsonValue[];

  if (apiSerializer) {
    try {
      // Pass the raw params (string, object, array etc.) directly to the deserializer.
      // The serializer itself is responsible for handling its expected input format (e.g., parsing a string if necessary).
      const deserializedData = apiSerializer.deserialize(params);

      // Ensure the result of deserialization is an array for spreading.
      // Handle cases where deserialize might return a single value or undefined/null.
      if (Array.isArray(deserializedData)) {
        finalParams = deserializedData;
      } else if (deserializedData !== undefined && deserializedData !== null) {
        // If a single value was returned, wrap it in an array.
        finalParams = [deserializedData];
        debugLog(
          `Deserializer returned non-array for ${method}, wrapped:`,
          finalParams,
        );
      } else {
        // If deserialize returned undefined/null, use an empty array.
        finalParams = [];
        debugLog(
          `Deserializer returned undefined/null for ${method}, using empty params.`,
        );
      }
    } catch (e: any) {
      const errorMsg = e instanceof Error ? e.message : String(e);
      console.error(
        `Deserialization error for method "${method}":`,
        errorMsg,
        'Input params:',
        params,
      );
      // If deserialization fails, throw an error that can be sent back to the client.
      throw new InternalError({
        method,
        params,
        message: `Failed to deserialize parameters for method "${method}": ${errorMsg}`,
        originalError: toJsonObject(e),
      });
    }
  } else {
    // No serializer, ensure params is an array.
    finalParams = Array.isArray(params)
      ? params
      : params !== undefined
        ? [params]
        : [];
  }

  // Double check finalParams is an array before spreading (should be guaranteed by logic above)
  if (!Array.isArray(finalParams)) {
    console.error(
      `Internal Error: finalParams is not an array before calling handler for method "${method}". Value:`,
      finalParams,
    );
    // Fallback to empty array to prevent crash, but log error.
    finalParams = [];
  }

  // Call handler, always spreading the finalParams array
  debugLog(
    `Calling handler for method "${method}" with final params:`,
    finalParams,
  );
  const result = handler(...finalParams);
  // Ensure undefined results are sent as null per JSON-RPC spec
  return result === undefined ? null : result;
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

  onRequest(json.method, json.params ?? [], json);
}

/**
 * Handles a request with an ID (expecting a response)
 *
 * @param rpcReq - The request object
 */
async function handleRequest(rpcReq: JsonRpcRequest) {
  const { method, params } = rpcReq;
  if (!method) {
    console.error('Request missing method:', rpcReq);
    sendError(
      rpcReq,
      new MethodNotFound({
        method: method,
        params: params,
        details: 'Request is missing a method name',
      }),
    );
    return;
  }
  try {
    // Pass the full request object to onRequest
    const result = onRequest(method, params ?? [], rpcReq);

    // Handle potential promise returned by onRequest
    if (result instanceof Promise) {
      // Handle promise result
      result.then(
        (resolvedResult) => {
          // Serialize result using server serializer before sending
          const serializedResult = (res: JsonValue) =>
            apiSerializer ? apiSerializer.serialize(res) : res;
          sendResult(rpcReq, serializedResult(resolvedResult));
        },
        (error) => {
          if (!DEBUG_RPC) {
            console.error(
              `Async RPC Error in method "${method}": ${error?.message || error}`,
            );
          } else {
            console.error(
              `Async RPC Error executing method "${method}":`,
              error,
            );
          }
          sendError(rpcReq, error as Error);
        },
      );
    } else {
      // Serialize result using server serializer before sending
      const serializedResult = (res: JsonValue) =>
        apiSerializer ? apiSerializer.serialize(res) : res;
      sendResult(rpcReq, serializedResult(result));
    }
  } catch (err: any) {
    if (!DEBUG_RPC) {
      console.error(
        `Sync RPC Error in method "${method}": ${err?.message || err}`,
      );
    } else {
      console.error(`Sync RPC Error executing method "${method}":`, err);
    }
    sendError(rpcReq, err as Error);
  }
}

/**
 * Initialize the RPC system with the provided API methods
 *
 * @param apiInstance - Object containing the API methods to register
 * @param options - Configuration options
 * @param options.debug - Enable debug logging (default: false)
 * @param options.serializer - Optional custom serializer/deserializer
 */
export const init = <T extends MethodDictionary<T>>(
  apiInstance: T,
  options?: RpcOptions,
) => {
  DEBUG_RPC = options?.debug ?? false;

  // Reset state before initializing - REMOVED from here, should be handled by caller if needed (e.g., test setup)
  // resetInternalState();

  // Generate a unique client ID for this instance
  currentClientId = getNewClientId();
  debugLog(
    `Initializing RPC client #${currentClientId} with methods:`,
    Object.keys(apiInstance),
  );

  if (IS_INITIALIZED && !DEBUG_RPC) {
    console.warn(
      `[RPC] Re-initializing client #${currentClientId}. State has been reset.`,
    );
    // Note: Resetting state might be desirable in some cases, but could cause issues
    // if multiple independent APIs are intended. Consider context.
    // For tests, resetting is often necessary.
  }

  // Store the serializer if provided
  apiSerializer = options?.serializer;

  // Register the provided API methods
  methods = apiInstance as Record<string, (...args: JsonValue[]) => JsonValue>;

  // Process any queued method calls
  processQueuedMethodCalls();

  // Use sendRawOverride if provided, otherwise setup default listeners
  setupEventListeners();

  IS_INITIALIZED = true;
};

/**
 * Sends a JSON-RPC request and returns a promise for the result
 *
 * @param method - The name of the method to call
 * @param params - The parameters to pass to the method
 * @param timeout - Optional timeout in milliseconds
 * @param options - Optional object with client serializer or sendRawOverride
 * @returns A promise that resolves with the result or rejects with an error
 */
export const sendRequest = (
  method: string,
  params: any[] = [],
  timeout?: number,
  options?: { serializer?: Serializer; sendRawOverride?: SendRawFunc }, // Use options object
): Promise<JsonValue> =>
  new Promise((resolve, reject) => {
    const id = rpcIndex;

    // Use serializer from options if provided, otherwise default to no serialization
    const clientSerializer = options?.serializer;
    const serializedParams = clientSerializer
      ? params.map(clientSerializer.serialize)
      : (params as JsonValue[]);

    const req: JsonRpcRequest = {
      jsonrpc: '2.0',
      method,
      params: serializedParams,
      id,
      clientId: currentClientId,
    };
    rpcIndex += 1;

    // Track method name for better error messages
    pendingRequestMap.set(id, method);

    debugLog(
      `Sending request #${id} (client #${currentClientId}):`,
      method,
      params, // Log original params for clarity
    );

    const callback = (err?: InternalMethodError, result?: JsonValue) => {
      // Clear timeout regardless of outcome
      if (callback.timeout) {
        clearTimeout(callback.timeout);
      }
      // Clean up pending requests
      delete pending[id];
      pendingRequestMap.delete(id);

      if (err) {
        debugLog(`Error in request #${id}:`, err);

        // Construct the error object to be rejected
        let rejectError: Error;

        // If it's already an RPC error, pass it through
        if (err instanceof RpcError) {
          rejectError = err;
        }

        // If it's a standard error object with a name property
        else if (err && typeof err === 'object' && 'name' in err) {
          // Handle specific error types
          if (err.name === 'MethodNotFound') {
            rejectError = new MethodNotFound({
              method,
              params,
              details: `The method "${method}" is not registered on the receiving end.`,
            });
          } else if (err.name === 'InvalidRequest') {
            rejectError = new InvalidRequest({
              ...req,
              error: err,
              details: `Invalid request for method "${method}".`,
            } as ExtendedJsonRpcRequest);
          } else {
            // For any other named error, wrap it
            rejectError = new InternalError({
              originalError: toJsonObject(err),
              method,
              params: params.map((p) =>
                typeof p === 'object' ? '(complex object)' : p,
              ),
              message: (err as any)?.message || 'Unknown error',
            });
          }
        } else {
          // For any other error, wrap it in an InternalError
          rejectError = new InternalError({
            originalError: toJsonObject(err),
            method,
            params: params.map((p) =>
              typeof p === 'object' ? '(complex object)' : p,
            ),
            message: (err as any)?.message || 'Unknown error',
          });
        }

        if (!DEBUG_RPC) {
          console.error(
            `RPC Error in method "${method}": ${rejectError?.message || rejectError}`,
          );
        } else {
          console.error(
            `RPC Error details for method "${method}":`,
            rejectError,
          );
        }
        reject(rejectError);
      } else {
        // Deserialize result using client serializer *before* resolving
        const deserializedResult =
          clientSerializer && result !== undefined
            ? clientSerializer.deserialize(result)
            : result;

        debugLog(`Request #${id} succeeded:`, deserializedResult);
        resolve(deserializedResult);
      }
    };

    // Use options.timeout or default timeout
    const requestTimeout = timeout || 6000;
    callback.timeout = setTimeout(() => {
      delete pending[id];
      pendingRequestMap.delete(id);
      reject(
        new Error(`Request "${method}" timed out after ${requestTimeout}ms.`),
      );
    }, requestTimeout);

    pending[id] = callback;

    // Use sendRawOverride if provided in options, otherwise use the globally configured sendRaw
    const sender = options?.sendRawOverride || sendRaw;
    if (!sender) {
      // Reject immediately if no sender function is available
      console.error(
        `No send function available for request #${id} (method: ${method}). RPC not initialized or sender misconfigured.`,
      );
      reject(
        new Error(`RPC send function not available for method "${method}".`),
      );
      clearTimeout(callback.timeout); // Clear timeout as we are rejecting now
      delete pending[id]; // Clean up pending state
      pendingRequestMap.delete(id);
      return; // Stop execution here
    }

    // Send the request using the determined sender function
    try {
      debugLog(
        `Using sender function (Override: ${!!options?.sendRawOverride}) for request #${id}`,
      );
      sender(req);
    } catch (error: any) {
      if (!DEBUG_RPC) {
        console.error(
          `Error sending request #${id} (method: ${method}): ${error?.message || error}`,
        );
      } else {
        console.error(
          `Error sending request #${id} (method: ${method}):`,
          error,
        );
      }
      reject(error); // Reject the promise if sending fails
      clearTimeout(callback.timeout); // Clear timeout as we are rejecting now
      delete pending[id]; // Clean up pending state
      pendingRequestMap.delete(id);
    }
  });

/**
 * Resets the internal state of the RPC module
 * USE WITH CAUTION - Primarily for testing purposes
 */
export function resetInternalState() {
  debugLog('[RPC Internal Log] resetInternalState called.');
  DEBUG_RPC = false;
  IS_INITIALIZED = false;
  pendingRequestMap = new Map<number, string>();
  processedResponseIds = new Set<number>();
  pendingMethodCalls = [];
  lastMessageReceived = '';
  isEventListenersInitialized = false;
  // Explicitly reset clientIdCounter and currentClientId? Maybe not needed if init always sets new one.
  apiSerializer = undefined;
  methods = {};
  rpcIndex = 0;
  for (const key of Object.keys(pending)) {
    delete pending[key];
  }
  // Reset the sender function!!
  sendRaw = undefined as any;
  // Reset pending timeouts
  // Use for...of with Object.entries
  for (const [key, request] of Object.entries(pending)) {
    if (request?.timeout) {
      clearTimeout(request.timeout);
    }
    delete pending[key];
  }
  debugLog('RPC internal state reset complete.');
}
