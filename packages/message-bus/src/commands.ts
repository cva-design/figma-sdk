export interface SomeObject extends Record<string | symbol, unknown> {}

export enum Command {
	RunTests = "test:command/run-tests",
}

export interface RunTestsCommand extends SomeObject {
	pattern: string;
}

export type AckResult<T = unknown> = T &
	({ success: true } | { success: false; error: string });

export interface CommandDefinition<
	Id extends Command,
	Message = undefined,
	Result = void,
> {
	$id: Id;
	$type: "command";
	message: Message;
	result: Result;
}

export interface CommandRegistry
	extends Record<Command, CommandDefinition<Command, SomeObject | undefined>> {
	[Command.RunTests]: CommandDefinition<Command.RunTests, RunTestsCommand>;
}
