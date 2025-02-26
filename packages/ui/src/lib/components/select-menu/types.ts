export type SelectMenuItem = {
  id?: number | string;
  selected?: boolean;
  group?: string | null;
  groupLabel?: string | null;
  label?: string;
  value: string;
};
