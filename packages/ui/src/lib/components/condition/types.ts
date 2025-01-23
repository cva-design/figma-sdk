import type { SelectMenuItem } from '#ui';

export interface ConditionChangeEvent {
	variant: SelectMenuItem | null;
	operator: SelectMenuItem | null;
	value: SelectMenuItem | null;
}

export interface ConditionProps {
	variant: SelectMenuItem | null;
	operator: SelectMenuItem | null;
	value: SelectMenuItem | null;
} 