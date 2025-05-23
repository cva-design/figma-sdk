<script context="module" lang="ts">
	export type Size = 'small' | 'medium' | 'large';
	export type Weight = 'default' | 'strong';
	export type Align = 'start' | 'center' | 'end';
</script>

<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	export let size: $$Props['size'] = undefined;
	export let weight: $$Props['weight'] = undefined;
	export let align: $$Props['align'] = undefined;
	export let block: boolean = false;

	const label = cva(['fps-Text', 'fps-Label', $$props.class], {
		variants: {
			size: {
				small: 'fps-label-small',
				medium: 'fps-label-medium',
				large: 'fps-label-large'
			},
			weight: {
				default: 'fps-weight-default',
				strong: 'fps-weight-strong'
			},
			align: {
				start: 'fps-align-start',
				center: 'fps-align-center',
				end: 'fps-align-end'
			},
			block: {
				true: 'fps-block'
			}
		},
		defaultVariants: {
			size: 'medium',
			weight: 'default',
			align: 'start'
		}
	});

	interface $$Props extends HTMLLabelAttributes, VariantProps<typeof label> {
		block?: boolean;
		class?: string | null | undefined;
	}
</script>

<label {...$$restProps} class={label({ size, weight, align, block })}>
	<slot />
</label>

<style lang="scss">
	.fps-Text {
		margin: 0;
		font-family: var(--font-family-default);
		color: var(--figma-color-text);
		font-size: var(--font-size, var(--font-size-default));
		line-height: var(--line-height, var(--line-height-3));
		letter-spacing: var(--letter-spacing, var(--letter-spacing-3));
		font-weight: var(--font-weight, var(--font-weight-default));

		&:where(.fps-inverse) {
			color: var(--figma-color-text-oninverse);
		}

		/**
  Use custom properties to avoid specificy issues when nesting Text.
  Nested Text components inherit properties of the parent Text, unless customized.
  At the same time, Text falls back to default values without requiring :root level styling. */
		&:where(.fps-label-small) {
			--font-size: var(--font-size-1);
			--line-height: var(--line-height-1);
			--letter-spacing: var(--letter-spacing-1);
		}

		&:where(.fps-label-medium) {
			--font-size: var(--font-size-3);
			--line-height: var(--line-height-3);
			--letter-spacing: --letter-spacing-3;
		}

		&:where(.fps-label-large) {
			--font-size: var(--font-size-5);
			--line-height: var(--line-height-5);
			--letter-spacing: var(--letter-spacing-5);
		}

		&:where(.fps-weight-default) {
			--font-weight: var(--font-weight-default);
		}

		&:where(.fps-weight-strong) {
			--font-weight: var(--font-weight-strong);
		}

		&:where(.fps-align-start) {
			text-align: start;
		}

		&:where(.fps-align-center) {
			text-align: center;
		}

		&:where(.fps-align-end) {
			text-align: end;
		}

		&:where(.fps-block) {
			display: block;
		}

		& strong {
			font-weight: var(--font-weight-strong);
		}

		& code {
			font-family: var(--font-family-monospace);
			font-size: var(--font-size-2);
			background-color: var(--figma-color-bg-brand-tertiary);
			padding: 0.05rem 0.15rem;
			border-radius: var(--radius-extra-small);
		}

		mark {
			background-color: var(--figma-color-bg-onselected);
		}
	}

	.fps-Link {
		color: var(--figma-color-text-brand);
		text-decoration: none;

		&:focus-visible {
			outline: 1px solid var(--figma-color-border-selected-strong);
		}
	}
</style>
