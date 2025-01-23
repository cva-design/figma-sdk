import type { SelectMenuItem } from '#ui';

export interface SetChangeEvent {
	property: SelectMenuItem | null;
	value: string;
} 