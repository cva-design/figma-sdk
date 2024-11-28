import type { SomeObject } from './types';
export interface CommandDefinition<Id extends string, Message = undefined, Result = void> {
    $id: Id;
    $type: 'command';
    message: Message;
    result: Result;
}
export type CommandRegistry<TCommand> = {
    [K in keyof TCommand]: K extends string ? CommandDefinition<K, SomeObject | undefined> : never;
};
//# sourceMappingURL=commands.d.ts.map