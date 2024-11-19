import type { CommandRegistry } from './commands';
import type { EventRegistry } from './events';

/**
 * A union type of all possible values of type T
 */
export type SomeValueOf<T> = T[keyof T];


export type MessageData<Key extends keyof CommandRegistry | keyof EventRegistry> = Key extends keyof CommandRegistry
  ? CommandRegistry[Key]['message']
  : Key extends keyof EventRegistry
    ? EventRegistry[Key]['message']
    : never;

type Handler<Command extends SomeValueOf<CommandRegistry>> = (message: Command['message']) => Command['result'];

type Listener<Event extends SomeValueOf<EventRegistry>> = (message: Event['message']) => void;

export type CommandHandlers = {
  [K in keyof CommandRegistry]: Handler<CommandRegistry[K]>;
};

export type EventListeners = {
  [K in keyof EventRegistry]: Listener<EventRegistry[K]>;
};

export type DeregisterFn = () => void;
