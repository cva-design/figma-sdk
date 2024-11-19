<script context="module" lang="ts">
	import './button.css';
	export type Variant = 'primary' | 'secondary' | 'inverse' | 'destructive' | 'success' | 'text';
	export type Size = 'small' | 'medium';
</script>

<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	const button = cva('fp-Button', {
		variants: {
			variant: {
				primary: 'fp-variant-primary',
				secondary: 'fp-variant-secondary',
				inverse: 'fp-variant-inverse',
				destructive: 'fp-variant-destructive',
				success: 'fp-variant-success',
				text: 'fp-variant-text'
			},
			size: {
				small: 'fp-size-small',
				medium: 'fp-size-medium'
			},
			fullWidth: {
				true: 'fp-full-width'
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
<style>
	.fp-Button {
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

.fp-Button:where(.fp-variant-secondary) {
  --button-color-bg: transparent;
  --button-color-border: var(--figma-color-text);
  --button-color-text: var(--figma-color-border);
}

.fp-Button:where(.fp-variant-secondary) {
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

.fp-Button:where(.fp-variant-primary) {
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
.fp-Button:where(.fp-variant-destructive) {
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

.fp-Button:where(.fp-variant-success) {
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

.fp-Button:where(.fp-variant-inverse) {
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

.fp-Button:where(.fp-variant-text) {
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

.fp-Button:where(.fp-full-width) {
  width: 100%;
  max-width: 100%;
}

.fp-Button:where(.fp-size-small) {
  height: var(--space-6);
  padding: var(--space-1) var(--space-2);
}

.fp-Button:where(.fp-size-medium) {
  height: var(--space-8);
  padding: var(--space-2) var(--space-3);
}

</style>
