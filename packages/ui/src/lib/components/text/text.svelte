<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';

	const text = cva('fp-Text', {
		variants: {
			size: {
				small: 'fp-size-small',
				medium: 'fp-size-medium',
				large: 'fp-size-large'
			},
			weight: {
				default: 'fp-weight-default',
				strong: 'fp-weight-strong'
			},
			align: {
				start: 'fp-align-start',
				center: 'fp-align-center',
				end: 'fp-align-end'
			},
			block: {
				true: 'fp-block'
			},
			inverse: {
				true: 'fp-inverse'
			}
		},
		defaultVariants: {
			size: 'medium',
			weight: 'default',
			align: 'start',
			block: false,
			inverse: false
		}
	});

	interface $$Props extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof text> {}

	export let size: $$Props['size'] = undefined;
	export let weight: $$Props['weight'] = undefined;
	export let align: $$Props['align'] = undefined;
	export let block: $$Props['block'] = false;
	export let inverse: $$Props['inverse'] = false;
</script>

<span class={`${text({ size, weight, align, block, inverse })} ${$$props.class}`}>
	<slot />
</span>

<style lang="scss">
.fp-Text {
  margin: 0;
  font-family: var(--font-family-default);
  color: var(--figma-color-text);
  font-size: var(--font-size, var(--font-size-default));
  line-height: var(--line-height, var(--line-height-3));
  letter-spacing: var(--letter-spacing, var(--letter-spacing-3));
  font-weight: var(--font-weight, var(--font-weight-default));

  /**
  Use custom properties to avoid specificy issues when nesting Text.
  Nested Text components inherit properties of the parent Text, unless customized.
  At the same time, Text falls back to default values without requiring :root level styling. */
  &:where(.fp-size-small) {
    --font-size: var(--font-size-1);
    --line-height: var(--line-height-1);
    --letter-spacing: var(--letter-spacing-1);
  }

  &:where(.fp-size-medium) {
    --font-size: var(--font-size-3);
    --line-height: var(--line-height-3);
    --letter-spacing: --letter-spacing-3;
  }

  &:where(.fp-size-large) {
    --font-size: var(--font-size-5);
    --line-height: var(--line-height-5);
    --letter-spacing: var(--letter-spacing-5);
  }

  &:where(.fp-weight-default) {
    --font-weight: var(--font-weight-default);
  }

  &:where(.fp-weight-strong) {
    --font-weight: var(--font-weight-strong);
  }

  &:where(.fp-align-start) {
    text-align: start;
  }

  &:where(.fp-align-center) {
    text-align: center;
  }

  &:where(.fp-align-end) {
    text-align: end;
  }

  &:where(.fp-block) {
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

.fp-Link {
  color: var(--figma-color-text-brand);
  text-decoration: none;

  &:focus-visible {
    outline: 1px solid var(--figma-color-border-selected-strong);
  }
}
</style>
