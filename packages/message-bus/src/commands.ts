/**
 * Defines the structure for a command within the message bus system.
 * @template Id - A unique string identifier for the command.
 * @template Message - The type of the message payload associated with the command (defaults to undefined).
 * @template Result - The type of the result expected after executing the command (defaults to void).
 */
export interface CommandDefinition<
  Id extends string,
  Message = undefined,
  Result = void,
> {
  /** The unique identifier for the command. */
  $id: Id;
  /** Indicates the type of this definition (always 'command'). */
  $type: 'command';
  /** The type of the message payload for this command. */
  message: Message;
  /** The type of the result returned by this command's handler. */
  result: Result;
}

/**
 * Represents a registry mapping command IDs to their definitions.
 * @template TCommandMessageMap - An object type where keys are command IDs (strings)
 *                                and values are the corresponding message payloads.
 */
export type CommandRegistry<TCommandMessageMap> = {
  // Maps each key K from TCommandMessageMap to a CommandDefinition.
  // Ensures that the key K is a string.
  [K in keyof TCommandMessageMap]: K extends string
    ? CommandDefinition<K, TCommandMessageMap[K]>
    : never;
};
