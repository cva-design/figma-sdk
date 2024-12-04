// Copied from: https://github.com/yuanqing/create-figma-plugin/blob/main/packages/utilities/src/events.ts
export type EventHandler = {
	name: string;
	handler: (...args: unknown[]) => void;
};

export const eventHandlers: Record<string, EventHandler> = {};

let currentId = 0;

/**
 * Registers an event `handler` for the given event `name`.
 *
 * @returns Returns a function for deregistering the `handler`.
 * @category Events
 */
export function on<Handler extends EventHandler>(
	name: Handler["name"],
	handler: Handler["handler"],
): () => void {
	const id = `${currentId}`;
	currentId += 1;
	eventHandlers[id] = { handler, name };
	return (): void => {
		delete eventHandlers[id];
	};
}

/**
 * Registers an event `handler` that will run at most once for the given
 * event `name`.
 *
 * @returns Returns a function for deregistering the `handler`.
 * @category Events
 */
export function once<Handler extends EventHandler>(
	name: Handler["name"],
	handler: Handler["handler"],
): () => void {
	let done = false;
	return on(name, (...args): void => {
		if (done === true) {
			return;
		}
		done = true;
		handler(...args);
	});
}

/**
 * Calling `emit` in the [main context](https://figma.com/plugin-docs/how-plugins-run/) invokes the event
 * handler for the matching event `name` in your UI. Correspondingly, calling
 * `emit` in your UI invokes the event handler for the matching event `name`
 * in the main context.
 *
 * All `args` passed after `name` will be directly
 * [applied](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
 * on the event handler.
 *
 * See the [recipe for passing data between the main and UI contexts](<%- query('page', 'recipes').url %>#passing-data-between-the-plugin-widgets-main-and-ui-contexts).
 *
 * @category Events
 */
export function emit<Handler extends EventHandler>(
	name: Handler["name"],
	...args: Parameters<Handler["handler"]>
): void {
	if (typeof window === "undefined") {
		figma.ui.postMessage([name, ...args]);
	} else {
		window.parent.postMessage(
			{
				pluginMessage: [name, ...args],
			},
			"*",
		);
	}
}

export function invokeEventHandler(name: string, args: Array<unknown>): void {
	for (const id in eventHandlers) {
		if (eventHandlers[id].name === name) {
			eventHandlers[id].handler.apply(null, args);
		}
	}
}

if (typeof window === "undefined") {
	figma.ui.on("message", (data: unknown): void => {
		if (Array.isArray(data)) {
			const [name, ...args] = data as [string, unknown[]];
			invokeEventHandler(name, args);
		}
	});
} else {
	window.addEventListener("message", (event: MessageEvent): void => {
		if (typeof event.data.pluginMessage === "undefined") {
			return;
		}
		if (Array.isArray(event.data.pluginMessage)) {
			const [name, ...args]: [string, Array<unknown>] =
				event.data.pluginMessage;
			invokeEventHandler(name, args);
		}
	});
}
