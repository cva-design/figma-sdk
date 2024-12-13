import type { SomeValueOf } from './utils';

type Handler<TCmd, Command extends SomeValueOf<CommandRegistry<TCmd>>> = (
  message: Command['message'],
) => Command['result'];

type Listener<TEvt, Event extends SomeValueOf<EventRegistry<TEvt>>> = (
  message: Event['message'],
) => void;

export type CommandHandlers<TCmd = unknown> = {
  [K in keyof CommandRegistry<TCmd>]: Handler<TCmd, CommandRegistry<TCmd>[K]>;
};

export type EventListeners<TEvt = unknown> = {
  [K in keyof EventRegistry<TEvt>]: Listener<TEvt, EventRegistry<TEvt>[K]>;
};
