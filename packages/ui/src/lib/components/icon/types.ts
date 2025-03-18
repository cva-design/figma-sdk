type BaseProps = {
  /**
   * color: The color of the icon. This should be a CSS color variable.
   * @default "--figma-color-icon"
   */
  color?: string;

  /**
   * size: The size of the icon
   * @default "medium"
   */
  size?: 'tiny' | 'small' | 'medium' | 'large';

  /**
   * spin: Whether the icon should spin
   */
  spin?: boolean;
  class?: string;
  tooltip?: string;
};

export type IconName = keyof typeof import('#icons');

type NamedIconProps = BaseProps & {
  /**
   * iconName: The icon name from the icons collection
   */
  iconName: IconName;

  /**
   * icon: The icon svg cannot be set when iconText is provided.
   */
  icon?: never;

  /**
   * iconText: The iconText cannot be set when icon is provided
   */
  iconText?: never;
};

type TextIconProps = BaseProps & {
  /**
   * icon: The icon svg cannot be set when iconText is provided.
   */
  icon?: never;

  /**
   * iconName: The icon name cannot be set when iconText is provided
   */
  iconName?: never;

  /**
   * A string that will be displayed as the icon.
   * If provided, it is displayed instead of the icon.
   * It is useful for using characters or emojis as icons.
   */
  iconText: string;
};

type SvgIconProps = BaseProps & {
  /**
   * icon: An SVG string that will be used as the icon.
   */
  icon: string;

  /**
   * iconName: The iconName cannot be set when icon is provided
   */
  iconName?: never;

  /**
   * iconText: The iconText cannot be set when icon is provided
   */
  iconText?: never;
};

export type IconProps = NamedIconProps | TextIconProps | SvgIconProps;
