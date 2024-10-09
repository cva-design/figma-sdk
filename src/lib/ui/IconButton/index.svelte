<script lang="ts">
import Icon from './../Icon/index.svelte';

/**
 * iconName: The name of the icon to be displayed.
 */
export const iconName = '';

/**
 * iconText: The text to be displayed as the icon's content.
 */
export const iconText: string | null = null;

/**
 * selected: Indicates whether the icon is selected.
 */
export const selected = false;

/**
 * spin: Indicates whether the icon should have a spinning animation.
 */
export const spin = false;

/**
 * class: Additional CSS classes that can be applied to the icon.
 */
const className = '';
export { className as class };
</script>

<div on:click on:keypress class:selected class={className}>
	{#if selected === true}
		<Icon {iconName} {iconText} {spin} color="--figma-color-icon-onbrand" />
	{:else}
		<Icon {iconName} {iconText} {spin} color="--figma-color-icon" />
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		width: var(--size-medium);
		height: var(--size-medium);
		border-radius: var(--border-radius-small);
		border: 2px solid transparent;
	}
	div:hover {
		background: var(--figma-color-bg-hover);
	}
	div:active,
	div:focus {
		border: 2px solid var(--figma-color-border-brand-strong);
		outline: none;
	}

	.selected {
		background-color: var(--figma-color-bg-selected-strong);
	}
	.selected:hover {
		background-color: var(--figma-color-bg-selected-strong);
	}
	.selected:active,
	.selected:focus {
		border: 2px solid var(--figma-color-border-selected-strong);
	}
</style>
