<script lang="ts">
	import * as icons from '#icons';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { IconProps } from './types';

	/**
	 * Icon component variants using CVA
	 */
	const iconVariants = cva('icon-component', {
		variants: {
			size: {
				tiny: 'fps-icon-tiny', // 12px
				small: 'fps-icon-small', // 16px
				medium: 'fps-icon-medium', // 24px
				large: 'fps-icon-large' // 32px
			},
			spin: {
				true: 'spin'
			}
		},
		defaultVariants: {
			size: 'medium',
			spin: false
		}
	});

	type IconVariants = VariantProps<typeof iconVariants>;

	type $$Props = IconProps & IconVariants;

	$: colorStyle = $$props.color?.startsWith('--')
		? `var(${$$props.color})`
		: ($$props.color ?? 'var(--figma-color-icon)');

	$: classes = iconVariants({
		size: $$props.size,
		spin: $$props.spin,
		class: $$props.class
	});
</script>

{#if $$props.iconName}
	<div class={classes} style="color: {colorStyle}; fill: {colorStyle}">
		{@html icons[$$props.iconName]}
	</div>
{:else if $$props.iconText}
	<div class={classes} style="color: {colorStyle}; fill: {colorStyle}">
		{$$props.iconText}
	</div>
{:else}
	<div class={classes} style="color: {colorStyle}; fill: {colorStyle}">
		{@html $$props.icon}
	</div>
{/if}

<style lang="scss">
	.icon-component {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
		font-family: var(--font-family-default);
		font-size: var(--text-body-medium-font-size);
		user-select: none;
	}

	.fps-icon-tiny {
		width: var(--spacer-3);
		height: var(--spacer-3);
	}

	.fps-icon-small {
		width: var(--spacer-3);
		height: var(--spacer-3);
	}

	.fps-icon-medium {
		width: var(--spacer-4);
		height: var(--spacer-4);
	}

	.fps-icon-large {
		width: var(--spacer-5);
		height: var(--spacer-5);
	}

	.spin {
		animation: rotating 1s linear infinite;
	}

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	:global(.icon-component *) {
		color: inherit;
	}
</style>
