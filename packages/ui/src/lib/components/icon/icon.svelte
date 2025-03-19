<script lang="ts">
	import * as icons from '#icons';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { IconProps } from './types';

	/**
	 * Icon component variants using CVA
	 */
	const iconVariants = cva('fps-Icon', {
		variants: {
			size: {
				tiny: 'fps-Icon-tiny', // 12px
				small: 'fps-Icon-small', // 16px
				medium: 'fps-Icon-medium', // 24px
				large: 'fps-Icon-large' // 32px
			},
			spin: {
				true: 'spin'
			},
			surface: {
				default: '',
				menu: 'fps-Icon-menu'
			}
		},
		defaultVariants: {
			size: 'medium',
			spin: false,
			surface: 'default'
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
		surface: $$props.surface,
		class: $$props.class
	});
</script>

{#if $$props.iconName}
	<div class={classes}>
		{@html icons[$$props.iconName]}
	</div>
{:else if $$props.iconText}
	<div class={classes}>
		{$$props.iconText}
	</div>
{:else}
	<div class={classes}>
		{@html $$props.icon}
	</div>
{/if}

<style lang="scss">
	.fps-Icon {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
		font-family: var(--font-family-default);
		font-size: var(--text-body-medium-font-size);
		user-select: none;
		color: var(--color-icon);

		:global(*) {
			color: inherit;
		}
	}

	.fps-Icon-tiny {
		width: var(--spacer-3);
		height: var(--spacer-3);
	}

	.fps-Icon-small {
		width: var(--spacer-3);
		height: var(--spacer-3);
	}

	.fps-Icon-medium {
		width: var(--spacer-4);
		height: var(--spacer-4);
	}

	.fps-Icon-large {
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

	.fps-Icon-menu {
		fill: var(--color-icon-menu);
		color: var(--color-icon-menu);
	}
</style>
