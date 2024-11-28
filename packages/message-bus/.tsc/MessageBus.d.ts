import type { CommandRegistry } from './commands';
import { type EventRegistry } from './events';
import type { CommandHandlers, DeregisterFn, EventListeners } from './types';
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
export declare class MessageBusSingleton<TCommands = any, TEvents = any> {
    private static instance?;
    protected $handlers: Partial<CommandHandlers<TCommands>>;
    protected $listeners: Partial<EventListeners<TEvents>>;
    private constructor();
    static getInstance<T = any, E = any>(): MessageBusSingleton<T, E>;
    handleCommand<Id extends keyof CommandHandlers<TCommands>>(command: Id, handler: CommandHandlers<TCommands>[Id]): DeregisterFn;
    sendCommand<Id extends keyof CommandRegistry<TCommands>>(command: Id, data: CommandRegistry<TCommands>[Id]['message']): CommandRegistry<TCommands>[Id]['result'] | undefined;
    listenToEvent<Id extends keyof EventListeners<TEvents>>(event: Id, listener: EventListeners<TEvents>[Id]): DeregisterFn;
    publishEvent<Id extends keyof EventRegistry<TEvents>>(event: Id, data: EventRegistry<TEvents>[Id]['message']): void;
}
export declare function getMessageBus<TCmdRegistry = any, TEvtRegistry = any>(): MessageBusSingleton<TCmdRegistry, TEvtRegistry>;
//# sourceMappingURL=MessageBus.d.ts.map