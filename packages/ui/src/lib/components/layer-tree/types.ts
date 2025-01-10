import type { IconProps } from '#ui/icon';

export type ActionKind = 'toggle' | 'button' | 'color';

type ActionBase<RequiredIcons extends string, OptionalIcons extends string> = {
  id: string;
  kind: ActionKind;
  tooltip: string;
  enabled?: boolean;
  click?: (params: {
    action: IAction;
    event: Event;
    data: Record<string, any>;
  }) => void;
  icons: Record<RequiredIcons, IconProps> & {
    [K in OptionalIcons]?: IconProps;
  };
};

export type ActionToggle = ActionBase<'on' | 'off', 'disabled'> & {
  kind: 'toggle';
  isActive?: boolean;
};

export type ActionButton = ActionBase<'default', 'disabled'> & {
  kind: 'button';
};

export type ActionColor = ActionBase<'default', 'disabled'> & {
  kind: 'color';
  colors?: string[];
};

export type IAction = ActionToggle | ActionButton | ActionColor;
