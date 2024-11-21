<script lang="ts">
	import './text.css';
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
