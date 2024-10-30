<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LayerProps } from './Layer.svelte';

	interface Action {
		id: string;
		icon: string;
		tooltip: string;
		active?: boolean;
		enabled?: boolean;
		click?: (params: { action: Action; event: Event; layer: LayerProps }) => void;
	}

	interface $$Props extends HTMLAttributes<HTMLButtonElement> {
		action: Action;
		layer: LayerProps;
	}

	export let action: $$Props['action'];
	export let layer: LayerProps;

	function handleClick(event: Event) {
		if (action.click) {
			action.click({ action, event, layer });
		}
	}
</script>

<button
	class="action"
	class:active={action.active}
	disabled={!action.enabled}
	title={action.tooltip}
	on:click={handleClick}
	{...$$restProps}
>
	{@html action.icon}
</button>

<style>
	.action {
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px;
		margin: 0 2px;
		color: var(--figma-color-icon-secondary);
	}

	.action:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.action.active {
		color: var(--figma-color-icon);
	}

	.action:hover:not(:disabled) {
		color: var(--figma-color-icon);
	}
</style>
