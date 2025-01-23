<script lang="ts">
	import { Condition } from '#ui';
	import type { SelectMenuItem } from '#ui';
	import { createEventDispatcher } from 'svelte';

	export let conditions: Array<{
		variant: SelectMenuItem | null;
		operator: SelectMenuItem | null;
		value: SelectMenuItem | null;
	}> = [
		{ variant: null, operator: null, value: null },
		{ variant: null, operator: null, value: null }
	];

	const dispatch = createEventDispatcher<{
		change: {
			conditions: Array<{
				variant: SelectMenuItem | null;
				operator: SelectMenuItem | null;
				value: SelectMenuItem | null;
			}>;
		};
	}>();

	function handleConditionChange(index: number, event: CustomEvent<{
		variant: SelectMenuItem | null;
		operator: SelectMenuItem | null;
		value: SelectMenuItem | null;
	}>) {
		conditions[index] = event.detail;
		dispatch('change', { conditions });
	}
</script>

<div class="criteria">
	<div class="condition-row">
		<span class="condition-label">if</span>
		<Condition
			variant={conditions[0].variant}
			operator={conditions[0].operator}
			value={conditions[0].value}
			on:change={(e) => handleConditionChange(0, e)}
		/>
	</div>
	<div class="condition-row">
		<span class="condition-label">and</span>
		<Condition
			variant={conditions[1].variant}
			operator={conditions[1].operator}
			value={conditions[1].value}
			on:change={(e) => handleConditionChange(1, e)}
		/>
	</div>
</div>

<style lang="scss">
	.criteria {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.condition-row {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.condition-label {
		width: 32px;
		color: var(--figma-color-text);
		font-size: 14px;
	}
</style> 