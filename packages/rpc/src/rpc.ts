import { InternalError, InvalidRequest, MethodNotFound } from "./errors";
import type {
	ApiMethodsDictionary,
	InternalMethodError,
	JsonRpcRequest,
	JsonValue,
} from "./types";
import { isPromise, toJsonObject } from "./utils";

export let sendRaw: (message: JsonRpcRequest) => void;

if (typeof figma !== "undefined") {
	figma.ui.on("message", (message: JsonRpcRequest) => handleRaw(message));
	sendRaw = (message) => {
		figma.ui.postMessage(message);
	};
} else if (typeof parent !== "undefined") {
	window.addEventListener("message", (event) =>
		handleRaw(event.data.pluginMessage),
	);
	sendRaw = (message) => parent.postMessage({ pluginMessage: message }, "*");
}
let rpcIndex = 0;
const pending: {
	[key: string]: {
		(err?: InternalMethodError, result?: JsonValue): JsonValue;
		timeout: NodeJS.Timeout;
	};
} = {};

function sendJson(
	req: JsonRpcRequest,
	timeoutId?: ReturnType<typeof setTimeout>,
): void {
	try {
		sendRaw(req);

		if (timeoutId) clearTimeout(timeoutId);
	} catch (err) {
		console.error(err);
	}
}

function sendResult(json: JsonRpcRequest, result: JsonValue) {
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

function handleRpc(rpcRequest: JsonRpcRequest) {
	if (typeof rpcRequest.id !== "undefined") {
		if (
			typeof rpcRequest.result !== "undefined" ||
			rpcRequest.error ||
			typeof rpcRequest.method === "undefined"
		) {
			if (!pending[rpcRequest.id]) {
				sendError(rpcRequest, new InvalidRequest(rpcRequest));
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

let methods: ApiMethodsDictionary = {};

function onRequest(method: string, params: JsonValue[]) {
	if (!methods[method]) {
		throw new MethodNotFound({ method, params });
	}
	return methods[method](...params);
}

function handleNotification(json: JsonRpcRequest) {
	if (!json.method) {
		return;
	}
	onRequest(json.method, json.params ?? []);
}

function handleRequest(rpcReq: JsonRpcRequest) {
	if (!rpcReq.method) {
		sendError(
			rpcReq,
			new MethodNotFound({ method: rpcReq.method, params: rpcReq.params }),
		);
		return;
	}
	try {
		const result = onRequest(rpcReq.method, rpcReq.params ?? []);
		if (isPromise(result)) {
			result
				.then((res: JsonValue) => sendResult(rpcReq, res))
				.catch((err: Error) => sendError(rpcReq, err));
		} else {
			sendResult(rpcReq, result);
		}
	} catch (err) {
		sendError(rpcReq, err as Error);
	}
}

export const init = (apiInstance: ApiMethodsDictionary) => {
	methods = apiInstance;
};

// export const sendNotification = (method: string, params: any) => {
//   sendJson({ jsonrpc: '2.0', method, params });
// };

export const sendRequest = (
	method: string,
	params: JsonValue[] = [],
	timeout?: number,
): Promise<JsonValue> =>
	new Promise((resolve, reject) => {
		const id = rpcIndex;
		const req: JsonRpcRequest = { jsonrpc: "2.0", method, params, id };
		rpcIndex += 1;

		const callback = (err?: InternalMethodError, result?: JsonValue) => {
			if (err) {
				reject(new InternalError(toJsonObject(err)));
				return;
			}
			resolve(result);
			return result;
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
