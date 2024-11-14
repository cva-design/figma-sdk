<script context="module" lang="ts">
	import './text.scss';
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

	const label = cva(['fp-Text', 'fp-Label', $$props.class], {
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
		class: string | null | undefined;
	}
</script>

<label {...$$restProps} class={label({ size, weight, align, block })}>
	<slot />
</label>
