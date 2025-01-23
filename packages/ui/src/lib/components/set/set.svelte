<script lang="ts">
	import { SelectMenu, Input } from '#ui';
	import type { SelectMenuItem } from '#ui';
	import { createEventDispatcher } from 'svelte';

	export let property: SelectMenuItem | null = null;
	export let value: string = '';

	const dispatch = createEventDispatcher<{
		change: { property: SelectMenuItem | null; value: string };
	}>();

	const propertyOptions: SelectMenuItem[] = [
		{ label: 'Fill', value: 'fill' },
		{ label: 'Stroke', value: 'stroke' },
		{ label: 'Background', value: 'background' },
		{ label: 'Color', value: 'color' }
	];

	function handlePropertyChange(event: CustomEvent<SelectMenuItem>) {
		property = event.detail;
		dispatchChange();
	}

	function handleValueChange(event: CustomEvent<string>) {
		value = event.detail;
		dispatchChange();
	}

	function dispatchChange() {
		dispatch('change', { property, value });
	}
</script>

<div class="set">
	<span class="label">property</span>
	<div class="select-container">
		<SelectMenu
			menuItems={propertyOptions}
			placeholder="Fill"
			icon=""
			value={property}
			on:change={handlePropertyChange}
		/>
	</div>
	<span class="label">to</span>
	<div class="input-container">
		<Input
			value={value}
			placeholder="#fff"
			on:change={(e) => handleValueChange(e)}
		/>
	</div>
</div>

<style lang="scss">
	.set {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.label {
		color: var(--figma-color-text);
		font-size: 14px;
	}

	.select-container {
		width: 150px;
	}

	.input-container {
		width: 120px;
	}
</style> 