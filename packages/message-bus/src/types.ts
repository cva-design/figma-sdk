import type { CommandRegistry } from './commands';
import type { EventRegistry } from './events';

/**
 * A union type of all possible values of type T
 */
export type SomeValueOf<T> = T[keyof T];
export type SomeObject = Record<string, unknown>;
export type AutocompletableString = string | number | symbol;

export type MessageData<
  TCmd = any,
  TEvt = any,
  Key extends keyof CommandRegistry<TCmd> | keyof EventRegistry<TEvt> = never,
> = Key extends keyof CommandRegistry<TCmd>
  ? CommandRegistry<TCmd>[Key]['message']
  : Key extends keyof EventRegistry<TEvt>
    ? EventRegistry<TEvt>[Key]['message']
    : never;

type Handler<TCmd, Command extends SomeValueOf<CommandRegistry<TCmd>>> = (
  message: Command['message'],
) => Command['result'];

type Listener<TEvt, Event extends SomeValueOf<EventRegistry<TEvt>>> = (
  message: Event['message'],
) => void;

export type CommandHandlers<TCmd = any> = {
  [K in keyof CommandRegistry<TCmd>]: Handler<TCmd, CommandRegistry<TCmd>[K]>;
};

export type EventListeners<TEvt = any> = {
  [K in keyof EventRegistry<TEvt>]: Listener<TEvt, EventRegistry<TEvt>[K]>;
};

export type DeregisterFn = () => void;
