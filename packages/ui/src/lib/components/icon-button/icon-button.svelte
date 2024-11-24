<script lang="ts">
	import { Tooltip } from '$ui/tooltip';
	import { cva, type VariantProps } from 'class-variance-authority';

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

	interface $$Props extends VariantProps<typeof iconButton> {
		'aria-label': string;
		tooltipContent?: string;
		disableTooltip?: boolean;
		class?: string;
	}

	export let size: $$Props['size'] = undefined;
	export let activeAppearance: $$Props['activeAppearance'] = undefined;
	export let tooltipContent: string | undefined = undefined;
	export let disableTooltip = false;
	export { className as class };

	let className = '';
</script>

<svelte:element
	this="button"
	class={iconButton({ size, activeAppearance, class: className })}
	aria-label={$$props['aria-label']}
	on:click
	on:keydown
	{...$$restProps}
>
	{#if disableTooltip}
		<slot />
	{:else}
		<Tooltip content={tooltipContent ?? $$props['aria-label']}>
			<slot />
		</Tooltip>
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
		color: var(--figma-color-icon-disabled);
		cursor: not-allowed !important;
		pointer-events: none;
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
