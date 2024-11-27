import { sendRequest } from "./rpc";
import type { MakeAllFnAsync, RpcClientOptions } from "./types";

function listMethods(classConstructor: NewableFunction): string[] {
	const properties = new Set<string>();
	let obj = classConstructor.prototype;

	do {
		if (obj === Object.prototype) break; // Stop traversing when reaching Object.prototype

		for (const prop of Object.getOwnPropertyNames(obj)) {
			if (prop !== "constructor" && typeof obj[prop] === "function") {
				properties.add(prop);
			}
		}

		obj = Object.getPrototypeOf(obj);
	} while (obj);

	return [...properties];
}

export function createClient<T extends NewableFunction>(
	stubClass: T,
	options?: RpcClientOptions,
): MakeAllFnAsync<T> {
	const timeout = options?.timeout;
	const methods = listMethods(stubClass);

	const stub = {} as MakeAllFnAsync<T>;

	for (const p in methods) {
		// @ts-ignore
		stub[p] = (...params) => sendRequest(p, params, timeout);
	}
	return stub;
}
