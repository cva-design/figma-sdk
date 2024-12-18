import type { JsonObject } from 'type-fest';
import type { Handler, Listener } from './message-handling';

/**
 * Command registry type
 */
export type CommandRegistry<
  T extends Record<string, JsonObject>,
  Scope extends string = '',
> = {
  [K in keyof T]: Handler<T, Scope>;
};

/**
 * Event registry type
 */
export type EventRegistry<
  T extends Record<string, JsonObject>,
  Scope extends string = '',
> = {
  [K in keyof T]: Set<Listener<T, Scope>>;
};
