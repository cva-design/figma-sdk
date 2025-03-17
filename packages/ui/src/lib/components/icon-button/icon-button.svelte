<script lang="ts">
	import { Icon, type IconProps } from '#ui/icon';
	import { Tooltip } from '#ui/tooltip';
	import { type VariantProps, cva } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const iconButton = cva('fps-IconButton', {
		variants: {
			size: {
				tiny: 'fps-button-tiny',
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

	type $$Props = IconProps &
		HTMLButtonAttributes &
		VariantProps<typeof iconButton> & {
			tooltipContent?: string;
			disableTooltip?: boolean;
			spin?: boolean;
		};

	export let size: IconProps['size'] = undefined;
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
				<Icon {icon} {spin} {size} color="--figma-color-icon" />
			{:else if iconName}
				<Icon {iconName} {spin} {size} color="--figma-color-icon" />
			{/if}
		</slot>
	{:else if tooltipContent || $$props['aria-label']}
		<Tooltip content={tooltipContent ?? $$props['aria-label']}>
			<slot>
				{#if icon}
					<Icon {icon} {spin} {size} color="--figma-color-icon" />
				{:else if iconName}
					<Icon {iconName} {spin} {size} color="--figma-color-icon" />
				{/if}
			</slot>
		</Tooltip>
	{:else}
		<slot>
			{#if icon}
				<Icon {icon} {spin} {size} color="--figma-color-icon" />
			{:else if iconName}
				<Icon {iconName} {spin} {size} color="--figma-color-icon" />
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

		:global(.fps-Icon svg) {
      fill: var(--figma-color-icon-disabled);
      color: var(--figma-color-icon-disabled);
		}
	}

	.fps-IconButton:focus-visible {
		outline: 2px solid var(--figma-color-border-selected);
		outline-offset: -1px;
		border-radius: var(--border-radius-small);
	}

	.fps-button-tiny {
		width: var(--spacer-2);
		height: var(--spacer-2);
	}

	.fps-button-small {
		width: var(--spacer-3);
		height: var(--spacer-3);
	}

	.fps-button-medium {
		width: var(--icon-button-size);
		height: var(--spacer-4);
	}

	.fps-button-large {
		width: var(--spacer-5);
		height: var(--spacer-5);
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
