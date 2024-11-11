<script lang="ts">
	import * as icons from '$icons';
	import { cva, type VariantProps } from 'class-variance-authority';

	const DEFAULT_SIZE = '6';
	const DEFAULT_VIEWBOX = '0 0 24 24';

	const iconClasses = cva('fp-Icon', {
		variants: {
			size: {
				'1': 'fp-size-1',
				'2': 'fp-size-2',
				'2_5': 'fp-size-2_5',
				'3': 'fp-size-3',
				'3_5': 'fp-size-3_5',
				'4': 'fp-size-4',
				'5': 'fp-size-5',
				'6': 'fp-size-6',
				'7': 'fp-size-7',
				'8': 'fp-size-8',
				'9': 'fp-size-9',
				'10': 'fp-size-10'
			}
		},
		defaultVariants: {
			size: DEFAULT_SIZE
		}
	});

	import type { SVGAttributes } from 'svelte/elements';

	type IconProps = VariantProps<typeof iconClasses> & {
		icon: keyof typeof import('$icons');
		viewBox?: string;
		class?: string;
	} & SVGAttributes<SVGSVGElement>;

	export let size: IconProps['size'] = DEFAULT_SIZE;
	export let icon: IconProps['icon'];
	export let viewBox = DEFAULT_VIEWBOX;

	$: classes = iconClasses({ size, class: $$props.class });
</script>

<svg xmlns="http://www.w3.org/2000/svg" {viewBox} class={classes} fill="none" {...$$restProps}>
	{@html icons[icon]}
</svg>

<style src="./fk-icon.css" lang="css"></style>
