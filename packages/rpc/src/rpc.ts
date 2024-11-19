import { InvalidRequest, MethodNotFound } from './errors';
import type { JsonRpcRequest } from './types';
export let sendRaw: (message: any) => void;

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
let rpcIndex = 0;
const pending: { [key: string]: Function } = {};

function sendJson(req: JsonRpcRequest, timeoutId?: number): void {
  try {
    sendRaw(req);

    if (timeoutId) clearTimeout(timeoutId);
  } catch (err) {
    console.error(err);
  }
}

function sendResult(json: JsonRpcRequest, result: any) {
  sendJson({
    ...json,
    result,
  });
}

function sendError(json: JsonRpcRequest, error: Error) {
  sendJson({
    ...json,
    error,
  });
}

export function handleRaw(data: JsonRpcRequest) {
  try {
    if (!data) {
      return;
    }

    // if (Array.isArray(data)) {
    //   const [name, ...args] = data as unknown as [string, Array<unknown>];
    //   invokeEventHandler(name, args);
    //   return;
    // }
    handleRpc(data);
  } catch (err) {
    console.error(err);
    console.error(data);
  }
}

function handleRpc(json: JsonRpcRequest) {
  if (typeof json.id !== 'undefined') {
    if (
      typeof json.result !== 'undefined' ||
      json.error ||
      typeof json.method === 'undefined'
    ) {
      if (!pending[json.id]) {
        sendError(json, new InvalidRequest(`Missing callback for ${json.id}`));
        return;
      }
      const callback = pending[json.id];
      // @ts-ignore
      if (callback.timeout) {
        // @ts-ignore
        clearTimeout(callback.timeout);
      }
      delete pending[json.id];
      callback(json.error, json.result);
    } else {
      handleRequest(json);
    }
  } else {
    handleNotification(json);
  }
}

let methods: { [key: string]: (...params: any[]) => any } = {};

function onRequest(method: string, params: any[]) {
  if (!methods[method]) {
    throw new MethodNotFound(method);
  }
  return methods[method](...params);
}

function handleNotification(json: JsonRpcRequest) {
  if (!json.method) {
    return;
  }
  onRequest(json.method, json.params ?? []);
}

function handleRequest(json: JsonRpcRequest) {
  if (!json.method) {
    sendError(json, new InvalidRequest('Missing method'));
    return;
  }
  try {
    const result = onRequest(json.method, json.params ?? []);
    if (result && typeof result.then === 'function') {
      result
        .then((res: any) => sendResult(json, res))
        .catch((err: any) => sendError(json, err));
    } else {
      sendResult(json, result);
    }
  } catch (err) {
    sendError(json, err as Error);
  }
}

export const init = (apiInstance: any) => {
  methods = apiInstance;
};

// export const sendNotification = (method: string, params: any) => {
//   sendJson({ jsonrpc: '2.0', method, params });
// };

export const sendRequest = (
  method: string,
  params: unknown[] = [],
  timeout?: number,
): Promise<Object> => new Promise((resolve, reject) => {
    const id = rpcIndex;
    const req = { jsonrpc: '2.0', method, params, id };
    rpcIndex += 1;
    const callback = (err: Error, result: Object) => {
      if (err) {
        const jsError = new Error(err.message)
        jsError.code = err.code as unkown as string;
        jsError.data = err.data as unkown as Object;
        reject(jsError);
        return;
      }
      resolve(result);
    };

    // set a default timeout
    callback.timeout = setTimeout(() => {
      delete pending[id];
      reject(new Error(`Request ${method} timed out.`));
    }, timeout || 6000);

    pending[id] = callback;
    // test()
    sendJson(req, callback.timeout);
  });

// export { RPCError };
