import * as evtHandler from './handler';
import type { EventRegistry } from './types/figma-events';
import type {
  CommandHandlers,
  CommandRegistry,
  DeregisterFn,
  EventListeners,
} from './types/utils';
import { isFigmaEvent } from './utils';

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
      return handler(data as CommandRegistry<TCommands>[Id]['message']);
    });
  }

  public sendCommand<Id extends keyof CommandRegistry<TCommands>>(
    command: Id,
    data: CommandRegistry<TCommands>[Id]['message'],
  ): CommandRegistry<TCommands>[Id]['result'] | undefined {
    evtHandler.emit(String(command), data);
    return undefined;
  }

  public listenToEvent<Id extends keyof EventListeners<TEvents>>(
    event: Id,
    listener: EventListeners<TEvents>[Id],
  ): DeregisterFn {
    this.$listeners[event] = listener as Partial<EventListeners<TEvents>>[Id];

    if (isFigmaEvent(event as string)) {
      figma.on(
        event as ArgFreeEventType,
        listener as (...args: unknown[]) => void,
      );
      return (): void => {
        figma.off(
          event as ArgFreeEventType,
          listener as (...args: unknown[]) => void,
        );
      };
    }

    return evtHandler.on(String(event), (data: unknown) => {
      listener(data as EventRegistry<TEvents>[Id]['message']);
    });
  }

  public publishEvent<Id extends keyof EventRegistry<TEvents>>(
    event: Id,
    data: EventRegistry<TEvents>[Id]['message'],
  ): void {
    evtHandler.emit(String(event), data);
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
