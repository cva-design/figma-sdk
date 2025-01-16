<script context="module" lang="ts">
	export type Variant = 'primary' | 'secondary' | 'inverse' | 'destructive' | 'success' | 'text';
	export type Size = 'small' | 'medium';
</script>

<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const button = cva('fps-button', {
		variants: {
			variant: {
				primary: 'fps-variant-primary',
				secondary: 'fps-variant-secondary',
				inverse: 'fps-variant-inverse',
				destructive: 'fps-variant-destructive',
				success: 'fps-variant-success',
				text: 'fps-variant-text'
			},
			size: {
				small: 'fps-button-small',
				medium: 'fps-button-medium'
			},
			fullWidth: {
				true: 'fps-full-width'
			}
		},

		defaultVariants: {
			variant: 'secondary',
			size: 'small'
		}
	});

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof button> {
		fullWidth?: boolean;
	}

	export let variant: $$Props['variant'] = undefined;
	export let size: $$Props['size'] = undefined;
	export let fullWidth: boolean = false;
</script>

<button
	class={button({ variant, size, fullWidth, class: $$props.class })}
	{...$$restProps}
	on:click
	on:submit|preventDefault
>
	<slot />
</button>

<style lang="scss">
	.fps-button {
		box-sizing: border-box;
		background-clip: border-box;
		background-color: transparent;
		user-select: none;
		appearance: none;
		border: 0;
		cursor: default;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: fit-content;
		outline-width: 1px;
		outline-offset: -1px;
		outline-style: solid;
		outline-color: transparent;
		font-family: var(--font-family-default);
		font-size: var(--font-size-default);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--letter-spacing-default);
		line-height: var(--line-height-default);
		border-radius: var(--radius-medium);
	}

	.fps-button:where(.fps-variant-secondary) {
		--button-color-bg: transparent;
		--button-color-border: var(--figma-color-text);
		--button-color-text: var(--figma-color-border);
	}

	.fps-button:where(.fps-variant-secondary) {
		color: var(--figma-color-text);
		outline-color: var(--figma-color-border);

		&:active {
			background-color: var(--figma-color-bg-pressed);
		}

		&:focus-visible {
			outline-color: var(--figma-color-border-selected);
		}

		&:disabled {
			color: var(--figma-color-text-disabled);
			outline-color: var(--figma-color-border-disabled);
		}
	}

	.fps-button:where(.fps-variant-primary) {
		background-color: var(--figma-color-bg-brand);
		color: var(--figma-color-text-onbrand);

		&:active {
			background-color: var(--figma-color-bg-brand-pressed);
		}

		&:focus-visible {
			outline-color: var(--figma-color-border-onbrand-strong);
			box-shadow: 0 0 0 1px var(--figma-color-border-selected-strong);
		}

		&:disabled {
			color: var(--figma-color-text-ondisabled);
			background-color: var(--figma-color-bg-disabled);
		}
	}
	.fps-button:where(.fps-variant-destructive) {
		background-color: var(--figma-color-bg-danger);
		color: var(--figma-color-text-ondanger);

		&:active {
			background-color: var(--figma-color-bg-danger-pressed);
		}

		&:focus-visible {
			outline-color: var(--figma-color-border-ondanger-strong);
			box-shadow: 0 0 0 1px var(--figma-color-border-danger-strong);
		}

		&:disabled {
			color: var(--figma-color-text-ondisabled);
			background-color: var(--figma-color-bg-disabled);
		}
	}

	.fps-button:where(.fps-variant-success) {
		background-color: var(--figma-color-bg-success);
		color: var(--figma-color-text-onsuccess);

		&:active {
			background-color: var(--figma-color-bg-success-pressed);
		}

		&:focus-visible {
			outline-color: var(--figma-color-border-onbrand-strong);
			box-shadow: 0 0 0 1px var(--figma-color-border-success-strong);
		}

		&:disabled {
			color: var(--figma-color-text-ondisabled);
			background-color: var(--figma-color-bg-disabled);
		}
	}

	.fps-button:where(.fps-variant-inverse) {
		background-color: var(--figma-color-bg-inverse);
		color: var(--figma-color-text-oninverse);
		font-weight: 400;

		&:active {
			background-color: var(--figma-color-bg-brand-pressed);
		}

		&:focus-visible {
			outline-color: var(--figma-color-border-onbrand-strong);
			box-shadow: 0 0 0 1px var(--figma-color-border-selected);
		}

		&:disabled {
			color: var(--figma-color-text-ondisabled);
			background-color: var(--figma-color-bg-disabled);
		}
	}

	.fps-button:where(.fps-variant-text) {
		background-color: transparent;
		outline-color: transparent;
		color: var(--figma-color-text);

		&:hover {
			background-color: var(--figma-color-bg-hover);
		}

		&:active {
			background-color: var(--figma-color-bg-pressed);
		}

		&:focus-visible {
			outline-color: var(--figma-color-border-selected);
		}

		&:disabled {
			color: var(--figma-color-text-disabled);
			outline-color: var(--figma-color-border-disabled);
		}
	}

	.fps-button:where(.fps-full-width) {
		width: 100%;
		max-width: 100%;
	}

	.fps-button:where(.fps-button-small) {
		height: var(--spacer-4);
		padding: var(--spacer-1) var(--spacer-2);
	}

	.fps-button:where(.fps-button-medium) {
		height: var(--spacer-5);
		padding: var(--spacer-2) var(--spacer-3);
	}

	.fps-button:where(.fps-variant-text) {
		height: var(--text-body-large-strong-line-height);
		padding: var(--spacer-2);
	}
</style>
