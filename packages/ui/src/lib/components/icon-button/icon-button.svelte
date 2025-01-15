<script lang="ts">
	import type { IconProps } from '#ui/icon';
	import { Icon } from '#ui/icon';
	import { Tooltip } from '#ui/tooltip';
	import { type VariantProps, cva } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const iconButton = cva('fps-IconButton', {
		variants: {
			size: {
				small: 'fps-button-small',
				medium: 'fps-button-medium',
				large: 'fps-button-large'
			},
			activeAppearance: {
				subtle: 'fps-active-appearance-subtle',
				solid: 'fps-active-appearance-solid'
			}
		},
		defaultVariants: {
			size: 'medium',
			activeAppearance: 'subtle'
		}
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof iconButton> {
		tooltipContent?: string;
		disableTooltip?: boolean;
		icon?: IconProps['icon'];
		iconName?: IconProps['iconName'];
		spin?: boolean;
	}

	export let size: $$Props['size'] = undefined;
	export let activeAppearance: $$Props['activeAppearance'] = undefined;
	export let tooltipContent: string | undefined = undefined;
	export let disableTooltip: boolean = false;
	export let icon: IconProps['icon'] = undefined;
	export let iconName: IconProps['iconName'] = undefined;
	export let spin = false;
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
		<slot>
			{#if icon}
				<Icon {icon} {spin} color="--figma-color-icon" />
			{:else if iconName}
				<Icon {iconName} {spin} color="--figma-color-icon" />
			{/if}
		</slot>
	{:else if tooltipContent || $$props['aria-label']}
		<Tooltip content={tooltipContent ?? $$props['aria-label']}>
			<slot>
				{#if icon}
					<Icon {icon} {spin} color="--figma-color-icon" />
				{:else if iconName}
					<Icon {iconName} {spin} color="--figma-color-icon" />
				{/if}
			</slot>
		</Tooltip>
	{:else}
		<slot>
			{#if icon}
				<Icon {icon} {spin} color="--figma-color-icon" />
			{:else if iconName}
				<Icon {iconName} {spin} color="--figma-color-icon" />
			{/if}
		</slot>
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

	.fps-button-small {
		width: var(--space-4);
		height: var(--space-4);
	}

	.fps-button-medium {
		width: var(--space-6);
		height: var(--space-6);
	}

	.fps-button-large {
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
