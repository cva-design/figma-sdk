import type { SelectMenuItem } from '#ui';

export interface CriteriaRule {
  variant: SelectMenuItem | null;
  operator: SelectMenuItem | null;
  value: SelectMenuItem | null;
}

export interface CriteriaChangeEvent {
  rules: CriteriaRule[];
}
