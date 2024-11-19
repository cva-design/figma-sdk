<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import type Button from '../button/Button.svelte';
	import type IconButton from '../button/IconButton.svelte';

	type AllowedComponents = Button | IconButton;

	let className = '';
	export { className as class };
</script>

<div class="action-group {className}" style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: nowrap;">
	<slot />
</div>

<style>
	.action-group {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		flex-wrap: nowrap;
	}

	:global(.action-group > :not(:last-child)) {
		margin-right: -1px;
	}

	:global(.action-group > *:not(:first-child):not(:last-child)) {
		border-radius: 0;
	}

	:global(.action-group > *:first-child) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	:global(.action-group > *:last-child) {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	:global(.action-group:hover) {
		border: 1px solid var(--figma-color-icon-onbrand-secondary);
	}
</style>
