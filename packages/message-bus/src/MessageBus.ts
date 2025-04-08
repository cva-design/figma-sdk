import type { CommandRegistry } from './commands';
import {
  type ArgFreeEventType,
  type EventRegistry,
  FigmaEvent,
  type FigmaEventDefinition,
  type FigmaEventRegistry,
  isFigmaEvent,
} from './events';
import * as evtHandler from './handler';
import type { CommandHandlers, DeregisterFn, EventListeners } from './types';
import { JsonReviver, serializeForMessageBus } from './utils';

/**
 * A simple message bus implementation facilitating communication between
 * the main thread and the plugin UI.
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

  /** Internal storage for registered command handlers. */
  protected $handlers: Partial<CommandHandlers<TCommands>> = {};

  /** Internal storage for registered event listeners. */
  protected $listeners: Partial<EventListeners<TEvents>> = {};

  // Prevent external instantiation
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Retrieves the singleton instance of the MessageBus.
   * @template T - The type definition for commands the bus will handle.
   * @template E - The type definition for events the bus will handle.
   * @returns The singleton instance of MessageBusSingleton.
   */
  public static getInstance<T = unknown, E = unknown>(): MessageBusSingleton<
    T,
    E
  > {
    if (!MessageBusSingleton.instance) {
      MessageBusSingleton.instance = new MessageBusSingleton();
    }
    return MessageBusSingleton.instance as MessageBusSingleton<T, E>;
  }

  /**
   * Registers a handler function for a specific command.
   * @template Id - The ID of the command to handle.
   * @param command The command ID.
   * @param handler The function to execute when the command is received.
   * @returns A function to deregister the handler.
   */
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

  /**
   * Sends a command to the appropriate context (main thread or UI).
   * @template Id - The ID of the command to send.
   * @param command The command ID.
   * @param data The payload for the command.
   * @returns The result of the command execution (currently always returns `undefined` as execution is asynchronous).
   */
  public sendCommand<Id extends keyof CommandRegistry<TCommands>>(
    command: Id,
    data: CommandRegistry<TCommands>[Id]['message'],
  ): CommandRegistry<TCommands>[Id]['result'] | undefined {
    // Serialize data to handle Maps and complex objects
    const serializedData = serializeForMessageBus(data);

    evtHandler.emit(String(command), serializedData);
    return undefined;
  }

  /**
   * Registers a listener function for a specific event.
   * This handles both custom events and standard Figma events.
   * @template Id - The ID of the event to listen to.
   * @param event The event ID.
   * @param listener The function to execute when the event is published.
   * @returns A function to deregister the listener.
   */
  public listenToEvent<Id extends keyof EventListeners<TEvents>>(
    event: Id,
    listener: EventListeners<TEvents>[Id],
  ): DeregisterFn {
    this.$listeners[event] = listener as Partial<EventListeners<TEvents>>[Id];

    const eventString = String(event);

    if (isFigmaEvent(eventString)) {
      if (typeof figma !== 'undefined') {
        const typedListener = listener as (...args: any[]) => any;

        // Use the string value for the switch and figma.on/off calls
        switch (eventString) {
          case FigmaEvent.SelectionChanged:
          case FigmaEvent.CurrentPageChanged:
          case FigmaEvent.OnClose:
          case FigmaEvent.TimerStarted:
          case FigmaEvent.TimerPaused:
          case FigmaEvent.TimerStopped:
          case FigmaEvent.TimerDone:
          case FigmaEvent.TimerResume:
          case FigmaEvent.TimerAdjust:
            figma.on(
              eventString as ArgFreeEventType,
              typedListener as () => void,
            );
            break;
          case FigmaEvent.DocumentChanged:
            figma.on(
              'documentchange',
              typedListener as (evt: DocumentChangeEvent) => void,
            );
            break;
          case FigmaEvent.OnDrop:
            figma.on('drop', typedListener as (evt: DropEvent) => boolean);
            break;
          case FigmaEvent.OnRun:
            figma.on('run', typedListener as (evt: RunEvent) => void);
            break;
        }

        return (): void => {
          if (typeof figma !== 'undefined') {
            switch (eventString) {
              case FigmaEvent.SelectionChanged:
              case FigmaEvent.CurrentPageChanged:
              case FigmaEvent.OnClose:
              case FigmaEvent.TimerStarted:
              case FigmaEvent.TimerPaused:
              case FigmaEvent.TimerStopped:
              case FigmaEvent.TimerDone:
              case FigmaEvent.TimerResume:
              case FigmaEvent.TimerAdjust:
                figma.off(
                  eventString as ArgFreeEventType,
                  typedListener as () => void,
                );
                break;
              case FigmaEvent.DocumentChanged:
                figma.off(
                  'documentchange',
                  typedListener as (evt: DocumentChangeEvent) => void,
                );
                break;
              case FigmaEvent.OnDrop:
                figma.off('drop', typedListener as (evt: DropEvent) => boolean);
                break;
              case FigmaEvent.OnRun:
                figma.off('run', typedListener as (evt: RunEvent) => void);
                break;
            }
          }
        };
      }

      // Handle case where Figma API is not available but a Figma event is listened to
      console.warn(
        `Attempted to listen to Figma event '${eventString}' in a non-Figma environment.`,
      );
      // Return a no-op deregister function
      return () => {};
    }

    // Handle custom events using the internal event handler system
    return evtHandler.on(eventString, (data: unknown) => {
      const parsedData =
        typeof data === 'string' ? JSON.parse(data, JsonReviver) : data;
      listener(parsedData as EventRegistry<TEvents>[Id]['message']);
    });
  }

  /**
   * Publishes an event to the appropriate context (main thread or UI).
   * This handles both custom events and standard Figma events.
   * @template Id - The ID of the event to publish.
   * @param event The event ID.
   * @param data The payload for the event.
   */
  public publishEvent<
    Id extends keyof EventRegistry<TEvents> | keyof FigmaEventRegistry,
  >(
    event: Id,
    data: Id extends keyof EventRegistry<TEvents>
      ? EventRegistry<TEvents>[Id]['message']
      : Id extends keyof FigmaEventRegistry
        ? FigmaEventRegistry[Id] extends FigmaEventDefinition<infer _T, infer U>
          ? U
          : never
        : never,
  ): void {
    const serializedData = serializeForMessageBus(data);
    evtHandler.emit(String(event), serializedData);
  }
}

/** The singleton instance of the MessageBus. */
const singleton = MessageBusSingleton.getInstance();

// ensure the API is never changed
Object.freeze(singleton);

/**
 * Retrieves the singleton instance of the MessageBus, typed for specific command and event registries.
 * This is the preferred way to access the MessageBus.
 * @template TCmdRegistry - The type definition for the command registry.
 * @template TEvtRegistry - The type definition for the event registry.
 * @returns The singleton `MessageBusSingleton` instance, properly typed.
 */
export function getMessageBus<
  TCmdRegistry = unknown,
  TEvtRegistry = unknown,
>(): MessageBusSingleton<TCmdRegistry, TEvtRegistry> {
  return MessageBusSingleton.getInstance<TCmdRegistry, TEvtRegistry>();
}
