import type { CommandRegistry } from './commands';
import type { EventRegistry } from './events';

/**
 * Extracts a union type of all possible values from an object type T.
 * @template T - The object type.
 */
export type SomeValueOf<T> = T[keyof T];

/** Represents a generic object with string keys and unknown values. */
export type SomeObject = Record<string, unknown>;

/** Defines a string type that supports autocompletion, often used for IDs. */
export type AutocompletableString = string | number | symbol;

/**
 * Retrieves the message payload type for a given command or event key.
 * @template TCmd - The command registry type.
 * @template TEvt - The event registry type.
 * @template Key - The specific command or event ID.
 */
export type MessageData<
  TCmd = unknown,
  TEvt = unknown,
  Key extends keyof CommandRegistry<TCmd> | keyof EventRegistry<TEvt> = never,
> = Key extends keyof CommandRegistry<TCmd>
  ? CommandRegistry<TCmd>[Key]['message'] // If Key is a command, get its message type
  : Key extends keyof EventRegistry<TEvt>
    ? EventRegistry<TEvt>[Key]['message'] // If Key is an event, get its message type
    : never; // Otherwise, never

/**
 * Defines the shape of a command handler function.
 * @template TCmd - The command registry type.
 * @template Command - The specific command definition.
 */
type Handler<TCmd, Command extends SomeValueOf<CommandRegistry<TCmd>>> = (
  message: Command['message'],
) => Command['result'];

/**
 * Defines the shape of an event listener function.
 * @template TEvt - The event registry type.
 * @template Event - The specific event definition.
 */
type Listener<TEvt, Event extends SomeValueOf<EventRegistry<TEvt>>> = (
  message: Event['message'],
) => void;

/**
 * Maps command IDs to their corresponding handler functions.
 * @template TCmd - The command registry type.
 */
export type CommandHandlers<TCmd = unknown> = {
  [K in keyof CommandRegistry<TCmd>]: Handler<TCmd, CommandRegistry<TCmd>[K]>;
};

/**
 * Maps event IDs to their corresponding listener functions.
 * @template TEvt - The event registry type.
 */
export type EventListeners<TEvt = unknown> = {
  [K in keyof EventRegistry<TEvt>]: Listener<TEvt, EventRegistry<TEvt>[K]>;
};

/** Represents a function that can be called to deregister a handler or listener. */
export type DeregisterFn = () => void;
