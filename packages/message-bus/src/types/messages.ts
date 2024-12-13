import type { KebabCase } from 'type-fest';

export type MsgId<
  Name extends string,
  Type extends string = '',
  Scope extends string = '',
> = Scope extends ''
  ? `${Type}/${KebabCase<Name>}`
  : `${Scope}:${Type}/${KebabCase<Name>}`;

export type CmdId<CmdName extends string, Scope extends string = ''> = MsgId<
  CmdName,
  'command',
  Scope
>;

export type EvtId<EvtName extends string, Scope extends string = ''> = MsgId<
  EvtName,
  'event',
  Scope
>;

// TODO: check why do we need $id and $type and document it here or remove them

export interface Envelope<
  Scope extends string,
  Type extends string,
  Name extends string,
  Data = undefined,
> {
  $id: MsgId<Name, Type, Scope>;
  $type: Type;
  $name: Name;
  $scope: Scope;
  message: Data;
}
