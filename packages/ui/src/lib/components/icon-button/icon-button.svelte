<script lang="ts">
	import { Tooltip } from '#ui/tooltip';
	import { type VariantProps, cva } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const iconButton = cva('fps-IconButton', {
		variants: {
			size: {
				small: 'fps-size-small',
				medium: 'fps-size-medium'
			},
			activeAppearance: {
				subtle: 'fps-active-appearance-subtle',
				solid: 'fps-active-appearance-solid'
			}
		},
		defaultVariants: {
			size: 'small',
			activeAppearance: 'subtle'
		}
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof iconButton> {
		tooltipContent?: string;
		disableTooltip?: boolean;
	}

	export const size: $$Props['size'] = undefined;
	export const activeAppearance: $$Props['activeAppearance'] = undefined;
	export const tooltipContent: string | undefined = undefined;
	export const disableTooltip: boolean = false;
</script>

<svelte:element
	this="button"
	class={iconButton({ size, activeAppearance, class: $$props.class })}
	aria-label={$$props['aria-label']}
	on:click
	on:keydown
	{...$$restProps}
>
	{#if disableTooltip}
		<slot />
	{:else if tooltipContent || $$props['aria-label']}
		<Tooltip content={tooltipContent ?? $$props['aria-label']}>
			<slot />
		</Tooltip>
	{:else}
		<slot />
	{/if}
</svelte:element>

<style lang="scss">
	.fps-IconButton {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
		color: var(--figma-color-icon);
	}

	.fps-IconButton:hover {
		background-color: var(--figma-color-bg-hover);
		border-radius: var(--border-radius-small);
	}
	.fps-IconButton:hover:not(:disabled) {
		background-color: var(--figma-color-bg-hover);
		border-radius: var(--border-radius-small);
	}

	.fps-IconButton:active {
		background-color: var(--figma-color-bg-pressed);
	}
	.fps-IconButton:active:not(:disabled) {
		background-color: var(--figma-color-bg-pressed);
	}

	.fps-IconButton:disabled {
		cursor: not-allowed !important;
		pointer-events: none;

		&.icon-component {
			svg {
				fill: var(--figma-color-icon-disabled);
				color: var(--figma-color-icon-disabled); // TODO: check if this is correct
			}
		}
	}

	.fps-IconButton:focus-visible {
		outline: 2px solid var(--figma-color-border-selected);
		outline-offset: -1px;
		border-radius: var(--border-radius-small);
	}

	.fps-size-small {
		width: var(--space-6);
		height: var(--space-6);
	}

	.fps-size-medium {
		width: var(--space-8);
		height: var(--space-8);
	}

	.fps-active-appearance-subtle:active {
		background-color: var(--figma-color-bg-pressed);
	}

	.fps-active-appearance-subtle:active:not(:disabled) {
		background-color: var(--figma-color-bg-pressed);
	}

	.fps-active-appearance-solid:active {
		background-color: var(--figma-color-bg-brand);
		color: var(--figma-color-icon-onbrand);
	}
	.fps-active-appearance-solid:active:not(:disabled) {
		background-color: var(--figma-color-bg-brand);
		color: var(--figma-color-icon-onbrand);
	}
</style>
