import type { JsonObject } from 'type-fest';

/**
 * Message envelope
 */
export interface MessageEnvelope<
  Scope extends string,
  Type extends string,
  Name extends string,
  Data extends JsonObject,
> {
  $id: string;
  $type: Type;
  $name: Name;
  $scope: Scope;
  message: Data;
}

/**
 * Message ID
 */
export type MessageId<
  Name extends string,
  Type extends string,
  Scope extends string,
> = Scope extends '' ? `${Type}/${Name}` : `${Scope}:${Type}/${Name}`;

/**
 * Command registry
 */
export type CommandRegistry<
  Commands extends Record<string, JsonObject>,
  Scope extends string = '',
> = {
  [K in keyof Commands]: MessageEnvelope<
    Scope,
    'command',
    string & K,
    Commands[K]
  >;
};

/**
 * Event registry
 */
export type EventRegistry<
  Events extends Record<string, JsonObject>,
  Scope extends string = '',
> = {
  [K in keyof Events]: MessageEnvelope<Scope, 'event', string & K, Events[K]>;
};
