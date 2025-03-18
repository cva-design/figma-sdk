import type { IconProps } from '../icon/types';

export type SelectMenuItem = Partial<IconProps> & {
  id?: number | string;
  selected?: boolean;
  group?: string | null;
  groupLabel?: string | null;
  label?: string;
  value: string;
};
