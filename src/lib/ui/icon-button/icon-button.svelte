<script context="module" lang="ts">
	export type IconButtonAppearanceOptions = {
		icon: keyof typeof import('$icons');
		tooltip?: string;
	};

	export type IconButtonAppearance =
		| IconButtonAppearanceOptions
		| {
				default: IconButtonAppearanceOptions;
				disabled?: IconButtonAppearanceOptions;
		  };

	// New types from React version
	export type IconButtonSize = 'small' | 'medium';
	export type IconButtonVariant = 'subtle' | 'solid';
</script>

<script lang="ts">
	import { Icon } from '$ui/icon';
	import { Tooltip } from '$ui/tooltip';
	import { cva } from 'class-variance-authority';

	// Existing props
	export let appearance: IconButtonAppearance;
	export let selected = false;
	export let disabled = false;
	export let tooltip: string | undefined = undefined;
	export let spin = false;

	// New props from React version
	export let size: IconButtonSize = 'small';
	export let variant: IconButtonVariant = 'subtle';
	export let ariaLabel: string | undefined = undefined;
	export let disableTooltip = false;

	const normalizedAppearance =
		'default' in appearance ? appearance : { default: appearance, disabled: appearance };

	const buttonIcon = cva('', {
		variants: {
			disabled: {
				false: normalizedAppearance.default.icon,
				true: normalizedAppearance.disabled?.icon || normalizedAppearance.default.icon
			}
		},
		defaultVariants: {
			disabled: false
		}
	});

	$: icon = buttonIcon({
		disabled
	}) as keyof typeof import('$icons');

	const iconButton = cva('fp-IconButton', {
		variants: {
			size: {
				small: 'fp-size-small',
				medium: 'fp-size-medium'
			},
			variant: {
				subtle: 'fp-active-appearance-subtle',
				solid: 'fp-active-appearance-solid'
			}
		},
		defaultVariants: {
			size: 'small',
			variant: 'subtle'
		}
	});

	$: buttonClass = iconButton({ size, variant });

	const className = '';
	export { className as class };
</script>

{#if !disableTooltip && (tooltip || ariaLabel)}
	<Tooltip content={String(tooltip || ariaLabel)}>
		<div
			role="button"
			tabindex="0"
			on:keypress
			on:click
			class:selected
			class:disabled
			class={`${buttonClass} ${className}`}
			aria-label={ariaLabel}
		>
			<slot>
				<Icon
					{icon}
					{spin}
					color={selected ? '--figma-color-icon-onbrand' : '--figma-color-icon'}
				/>
			</slot>
		</div>
	</Tooltip>
{:else}
	<div
		role="button"
		tabindex="0"
		on:keypress
		on:click
		class:selected
		class:disabled
		class={`${buttonClass} ${className}`}
		aria-label={ariaLabel}
	>
		<slot>
			<Icon {icon} {spin} color={selected ? '--figma-color-icon-onbrand' : '--figma-color-icon'} />
		</slot>
	</div>
{/if}

<style>
	/* Keep existing styles and add new ones from icon-button.css */
	div {
		box-sizing: border-box;
		background-clip: border-box;
		background-color: transparent;
		user-select: none;
		appearance: none;
		border: 0;
		padding: 0;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		--color-icon: var(--figma-color-icon);
		border-radius: var(--radius-medium);
		width: var(--spacer-5);
		height: var(--spacer-5);
	}

	div:hover:not(.disabled) {
		background: var(--figma-color-bg-hover);
	}

	div:focus-visible {
		outline-offset: -1px;
		outline: 1px solid var(--figma-color-border-selected);
	}

	.selected {
		background-color: var(--figma-color-bg-selected-strong);
	}

	.selected:hover {
		background-color: var(--figma-color-bg-selected-strong);
	}

	.disabled {
		--color-icon: var(--figma-color-icon-disabled);
		opacity: 0.5;
		cursor: not-allowed;
	}

	:global(.fp-size-small) {
		width: var(--space-6);
		height: var(--space-6);
	}

	:global(.fp-size-medium) {
		width: var(--space-8);
		height: var(--space-8);
	}

	:global(.fp-active-appearance-subtle[data-state='open']) {
		background-color: var(--figma-color-bg-selected);
		--color-icon: var(--figma-color-icon-brand);
	}

	:global(.fp-active-appearance-solid[data-state='open']) {
		background-color: var(--figma-color-bg-selected-strong);
		--color-icon: var(--figma-color-icon-onbrand);
	}
</style>
