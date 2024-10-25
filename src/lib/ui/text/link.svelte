<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import './text.scss';

	const link = cva('fp-Text fp-Link', {
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

	interface $$Props extends HTMLAnchorAttributes, VariantProps<typeof link> {
		block?: boolean;
	}

	export let size: $$Props['size'] = undefined;
	export let weight: $$Props['weight'] = undefined;
	export let align: $$Props['align'] = undefined;
	export let block: boolean = false;
</script>

<a class={link({ size, weight, align, block, class: $$props.class })} {...$$restProps}>
	<slot />
</a>
