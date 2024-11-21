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
