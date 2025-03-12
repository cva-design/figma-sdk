export interface CommandDefinition<
  Id extends string,
  Message = undefined,
  Result = void,
> {
  $id: Id;
  $type: 'command';
  message: Message;
  result: Result;
}

export type CommandRegistry<TCommandMessageMap> = {
  [K in keyof TCommandMessageMap]: K extends string
    ? CommandDefinition<K, TCommandMessageMap[K]>
    : never;
};
