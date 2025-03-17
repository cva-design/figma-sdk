<script lang="ts">
	import type { SelectMenuItem } from '#ui';
	import { Input, SelectMenu, Text } from '#ui';
	import { createEventDispatcher } from 'svelte';

	export let property: SelectMenuItem | null = null;
	export let value: string = '';

	const dispatch = createEventDispatcher<{
		change: { property: SelectMenuItem | null; value: string };
	}>();

	const frameOptions: SelectMenuItem[] = [
		{ label: 'Frame 123', value: 'frame123' },
		{ label: 'Frame 35', value: 'frame35' },
		{ label: 'Frame 235', value: 'frame235' },
		{ label: 'Frame 50', value: 'frame50' }
	];

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

	function handleValueChange(event: Event) {
		value = (event.target as HTMLInputElement).value;
		dispatchChange();
	}

	function dispatchChange() {
		dispatch('change', { property, value });
	}
</script>

<div class="set">
  <div class="select-container">
    <SelectMenu
			menuItems={frameOptions}
			placeholder="Frame 123"
			icon=""
			value={property}
			on:change={handlePropertyChange}
		/>
	</div>
  <div class="select-container">
		<SelectMenu
			menuItems={propertyOptions}
			placeholder="Fill"
			icon=""
			value={property}
			on:change={handlePropertyChange}
		/>
	</div>
	<Text>to</Text>
	<div class="input-container">
		<Input
			value={value}
			placeholder="#fff"
			on:change={handleValueChange}
		/>
	</div>
</div>

<style lang="scss">
	.set {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.select-container {
		width: 150px;
	}

	.input-container {
		width: 120px;
	}
</style> 