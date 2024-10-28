<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLButtonElement> {
		action: {
			id: string;
			icon: string;
			tooltip: string;
			active?: boolean;
			enabled?: boolean;
		};
	}

	export let action: $$Props['action'];
</script>

<button
	class="action"
	class:active={action.active}
	disabled={!action.enabled}
	title={action.tooltip}
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
