import type { AutocompletableString } from '$lib/util';

type IconBaseProps = {
  /**
   * color: The color of the icon. This should be a CSS color variable.
   * @default "--figma-color-icon"
   */
  color?: '--figma-color-icon' | AutocompletableString;

  /**
   * spin: Whether the icon should spin
   */
  spin?: boolean;
  class?: string;
};

type NamedIconProps = IconBaseProps & {
  /**
   * icon: The icon identifier from the icons collection
   */
  icon: keyof typeof import('$icons');

  /**
   * iconText: The iconText cannot be set when icon is provided
   */
  iconText?: never;
};

type TextIconProps = IconBaseProps & {
  /**
   * icon: The icon identifier cannot be set when iconText is provided
   */
  icon?: never;

  /**
   * A string that will be displayed as the icon.
   * If provided, it is displayed instead of the icon.
   * It is useful for using characters or emojis as icons.
   */
  iconText: string;
};

export type IconProps = NamedIconProps | TextIconProps;
