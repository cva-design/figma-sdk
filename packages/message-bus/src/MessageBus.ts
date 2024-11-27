import type { CommandRegistry } from "./commands";
import { type EventRegistry, isFigmaEvent } from "./events";
import * as evtHandler from "./handler";

import type { CommandHandlers, DeregisterFn, EventListeners } from "./types";

/**
 * A simple message bus implementation which magically works in both the main thread and the plugin UI.
 * No need to worry about sending messages in the right direction.
 *
 * @remarks
 * * Important: This class is a singleton but the main thread and the plugin UI are separate environments
 * * so each have their own instance.
 *
 * `@create-figma-plugin` package handles sending messages in the right direction.
 * I.e. it will send messages to the plugin UI when the emitter is the main thread,
 * or to the main thread when the emitter is the plugin UI.
 */
export class MessageBusSingleton {
	private static instance?: MessageBusSingleton;

	protected $handlers: Partial<CommandHandlers> = {};

	protected $listeners: Partial<EventListeners> = {};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	public static getInstance(): MessageBusSingleton {
		// Looks like eslint cannot predict this may be called multiple times
		// in case of module cache gotchas
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (!MessageBusSingleton.instance) {
			MessageBusSingleton.instance = new MessageBusSingleton();
		}

		return MessageBusSingleton.instance;
	}

	public handleCommand<Id extends keyof CommandHandlers>(
		command: Id,
		handler: CommandHandlers[Id],
	): DeregisterFn {
		this.$handlers[command] = handler;

		return evtHandler.on(command, handler);
	}

	public sendCommand<Id extends keyof CommandHandlers>(
		command: Id,
		data: CommandRegistry[Id]["message"],
	): CommandRegistry[Id]["result"] | undefined {
		evtHandler.emit(command, data);

		return undefined;
	}

	public listenToEvent<Id extends keyof EventListeners>(
		event: Id,
		listener: EventListeners[Id],
	): DeregisterFn {
		this.$listeners[event] = listener;

		if (isFigmaEvent(event as string)) {
			// There's no gain in tricking TS to think that the listener
			// has the correct type, so we just cast it to any
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-unknown
			figma.on(event as unknown, listener as unknown);
			return (): void => {
				// ditto
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				figma.off(event as unknown, listener as unknown);
			};
		}

		return evtHandler.on(event, listener);
	}

	public publishEvent<Id extends keyof EventListeners>(
		event: Id,
		data: EventRegistry[Id]["message"],
	): void {
		evtHandler.emit(event, data);
	}
}

const singleton = MessageBusSingleton.getInstance();

// ensure the API is never changed
// -------------------------------
Object.freeze(singleton);

// export the singleton instance only
// -----------------------------

export const MessageBus = singleton;
export default MessageBusSingleton;
