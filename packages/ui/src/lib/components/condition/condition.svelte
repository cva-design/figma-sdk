<script lang="ts">
	import { SelectMenu } from '#ui';
	import type { SelectMenuItem } from '#ui';
	import { createEventDispatcher } from 'svelte';

	export let variant: SelectMenuItem | null = null;
	export let operator: SelectMenuItem | null = null;
	export let value: SelectMenuItem | null = null;

	const dispatch = createEventDispatcher<{
		change: { variant: SelectMenuItem | null; operator: SelectMenuItem | null; value: SelectMenuItem | null };
	}>();

	const variantOptions: SelectMenuItem[] = [
		{ label: 'Variant', value: 'variant' },
		{ label: 'Primary', value: 'primary' },
		{ label: 'Secondary', value: 'secondary' },
		{ label: 'Tertiary', value: 'tertiary' }
	];

	const operatorOptions: SelectMenuItem[] = [
		{ label: 'equals', value: 'equals' },
		{ label: 'contains', value: 'contains' },
		{ label: 'starts with', value: 'starts-with' },
		{ label: 'ends with', value: 'ends-with' }
	];

	const valueOptions: SelectMenuItem[] = [
		{ label: 'Neutral', value: 'neutral' },
		{ label: 'Success', value: 'success' },
		{ label: 'Warning', value: 'warning' },
		{ label: 'Error', value: 'error' }
	];

	function handleVariantChange(event: CustomEvent<SelectMenuItem>) {
		variant = event.detail;
		dispatchChange();
	}

	function handleOperatorChange(event: CustomEvent<SelectMenuItem>) {
		operator = event.detail;
		dispatchChange();
	}

	function handleValueChange(event: CustomEvent<SelectMenuItem>) {
		value = event.detail;
		dispatchChange();
	}

	function dispatchChange() {
		dispatch('change', { variant, operator, value });
	}
</script>

<div class="condition">
	<div class="select-container">
		<SelectMenu
			menuItems={variantOptions}
			placeholder="Variant"
      icon=""
			value={variant}
			on:change={handleVariantChange}
		/>
	</div>
	<div class="select-container">
		<SelectMenu
			menuItems={operatorOptions}
			placeholder="equals"
      icon=""
			value={operator}
			on:change={handleOperatorChange}
		/>
	</div>
	<div class="select-container">
		<SelectMenu
			menuItems={valueOptions}
			placeholder="Neutral"
      icon=""
			value={value}
			on:change={handleValueChange}
		/>
	</div>
</div>

<style lang="scss">
	.condition {
		display: flex;
		gap: 8px;
		align-items: center;
	}

	.select-container {
		width: 150px;
	}
</style> 