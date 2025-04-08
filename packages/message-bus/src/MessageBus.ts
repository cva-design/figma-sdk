import type { CommandRegistry } from './commands';
import {
  type EventRegistry,
  type FigmaEventDefinition,
  type FigmaEventRegistry,
  isFigmaEvent,
} from './events';
import * as evtHandler from './handler';
import type { CommandHandlers, DeregisterFn, EventListeners } from './types';
import { JsonReviver, serializeForMessageBus } from './utils';

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
export class MessageBusSingleton<TCommands = unknown, TEvents = unknown> {
  private static instance?: MessageBusSingleton<unknown, unknown>;

  protected $handlers: Partial<CommandHandlers<TCommands>> = {};

  protected $listeners: Partial<EventListeners<TEvents>> = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance<T = unknown, E = unknown>(): MessageBusSingleton<
    T,
    E
  > {
    if (!MessageBusSingleton.instance) {
      MessageBusSingleton.instance = new MessageBusSingleton();
    }
    return MessageBusSingleton.instance as MessageBusSingleton<T, E>;
  }

  public handleCommand<Id extends keyof CommandHandlers<TCommands>>(
    command: Id,
    handler: CommandHandlers<TCommands>[Id],
  ): DeregisterFn {
    this.$handlers[command] = handler as Partial<
      CommandHandlers<TCommands>
    >[Id];
    return evtHandler.on(String(command), (data: unknown) => {
      // Parse received data through JSON to reconstruct Map objects
      const parsedData =
        typeof data === 'string' ? JSON.parse(data, JsonReviver) : data;

      return handler(parsedData as CommandRegistry<TCommands>[Id]['message']);
    });
  }

  public sendCommand<Id extends keyof CommandRegistry<TCommands>>(
    command: Id,
    data: CommandRegistry<TCommands>[Id]['message'],
  ): CommandRegistry<TCommands>[Id]['result'] | undefined {
    // Serialize data to handle Maps and complex objects
    const serializedData = serializeForMessageBus(data);

    evtHandler.emit(String(command), serializedData);
    return undefined;
  }

  public listenToEvent<Id extends keyof EventListeners<TEvents>>(
    event: Id,
    listener: EventListeners<TEvents>[Id],
  ): DeregisterFn {
    this.$listeners[event] = listener as Partial<EventListeners<TEvents>>[Id];

    if (isFigmaEvent(event as string)) {
      // Only attempt to use Figma API if the global `figma` object exists
      if (typeof figma !== 'undefined') {
        figma.on(
          event as ArgFreeEventType,
          listener as (...args: unknown[]) => void,
        );
        return (): void => {
          // Also check before using figma.off
          if (typeof figma !== 'undefined') {
            figma.off(
              event as ArgFreeEventType,
              listener as (...args: unknown[]) => void,
            );
          }
        };
      }

      // If figma is not defined, warn and return a no-op deregister function
      // This code is only reached if `typeof figma === 'undefined'`
      console.warn(
        `Attempted to listen to Figma event '${String(
          event,
        )}' in a non-Figma environment.`,
      );
      return () => {}; // Return a no-op function
    }

    return evtHandler.on(String(event), (data: unknown) => {
      // Parse received data through JSON to reconstruct Map objects
      const parsedData =
        typeof data === 'string' ? JSON.parse(data, JsonReviver) : data;

      listener(parsedData as EventRegistry<TEvents>[Id]['message']);
    });
  }

  public publishEvent<
    Id extends keyof EventRegistry<TEvents> | keyof FigmaEventRegistry,
  >(
    event: Id,
    data: Id extends keyof EventRegistry<TEvents>
      ? EventRegistry<TEvents>[Id]['message']
      : Id extends keyof FigmaEventRegistry
        ? FigmaEventRegistry[Id] extends FigmaEventDefinition<infer T, infer U>
          ? U
          : never
        : never,
  ): void {
    // Serialize data to handle Maps and complex objects
    const serializedData = serializeForMessageBus(data);

    evtHandler.emit(String(event), serializedData);
  }
}

const singleton = MessageBusSingleton.getInstance();

// ensure the API is never changed
// -------------------------------
Object.freeze(singleton);

// export the singleton instance only
// -----------------------------

export function getMessageBus<
  TCmdRegistry = unknown,
  TEvtRegistry = unknown,
>(): MessageBusSingleton<TCmdRegistry, TEvtRegistry> {
  return MessageBusSingleton.getInstance<TCmdRegistry, TEvtRegistry>();
}
