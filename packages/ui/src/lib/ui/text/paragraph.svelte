<script lang="ts">
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';
	import './text.scss';

	const paragraph = cva('fp-Text', {
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

	interface $$Props extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof paragraph> {
		block?: boolean;
	}

	export let size: $$Props['size'] = undefined;
	export let weight: $$Props['weight'] = undefined;
	export let align: $$Props['align'] = undefined;
	export let block: boolean = false;
</script>

<p class={paragraph({ size, weight, align, block, class: $$props.class })} {...$$restProps}>
	<slot />
</p>
