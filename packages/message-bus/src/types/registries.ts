import type { JsonObject, Simplify } from 'type-fest';
import type { Envelope } from './messages';

export type DeregisterFn = () => void;

export type MessageRegistry<
  Messages extends Record<string, JsonObject>,
  Scope extends string,
  Type extends 'message' | 'command' | 'event' = 'message',
> = {
  [K in keyof Messages]: K extends string
    ? Simplify<Envelope<Scope, Type, K, Messages[K]>>
    : never;
};

export type CommandRegistry<
  Commands extends Record<string, JsonObject>,
  Scope extends string = '',
> = MessageRegistry<Commands, Scope, 'command'>;

export type EventRegistry<
  Events extends Record<string, JsonObject>,
  Scope extends string = '',
> = MessageRegistry<Events, Scope, 'event'>;

// export type MessageData<
//   TCmd = unknown,
//   TEvt = unknown,
//   Key extends keyof CommandRegistry<TCmd> | keyof EventRegistry<TEvt> = never,
// > = Key extends keyof CommandRegistry<TCmd>
//   ? CommandRegistry<TCmd>[Key]['message']
//   : Key extends keyof EventRegistry<TEvt>
//     ? EventRegistry<TEvt>[Key]['message']
//     : never;
