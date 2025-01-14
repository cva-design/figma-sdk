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
				small: 'fps-size-small', // 12px
				medium: 'fps-size-medium', // 16px
				large: 'fps-size-large', // 24px
				giant: 'fps-size-giant' // 32px
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

	:global(.fps-size-small) {
		width: var(--space-3);
		height: var(--space-3);
	}

	:global(.fps-size-medium) {
		width: var(--space-4);
		height: var(--space-4);
	}

	:global(.fps-size-large) {
		width: var(--space-6);
		height: var(--space-6);
	}

	:global(.fps-size-giant) {
		width: var(--space-8);
		height: var(--space-8);
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
