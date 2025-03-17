import type { IconProps } from '#ui/icon';

export type Segment = Partial<IconProps> & {
  /** The value of this segment */
  value: string;
  /** The text to display in this segment (cannot be used with icon) */
  text?: string;
  /** The tooltip to show when hovering over this segment */
  tooltip?: string;
  /** Whether this segment is disabled */
  disabled?: boolean;
};
