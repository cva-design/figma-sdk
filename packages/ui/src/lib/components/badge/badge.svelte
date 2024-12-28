<script lang="ts">
	import Text from '$ui/typography/text.svelte';
	import { type VariantProps, cva } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';

	const badge = cva('fps-Badge', {
		variants: {
			hasActions: {
				true: 'fps-has-actions'
			},
			size: {
				small: 'fps-size-small',
				medium: 'fps-size-medium'
			},
			noDot: {
				true: 'fps-no-dot'
			}
		},
		defaultVariants: {
			hasActions: false,
			size: 'small',
			noDot: false
		}
	});

	/** Configuration object for badge colors */
	interface ColorConfig {
		/** Color of the dot indicator */
		dot?: string;
		/** Background color of the badge */
		bg?: string;
		/** Text color of the badge */
		text?: string;
	}

	interface $$Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof badge> {
		/** Text content of the badge */
		text?: string;
		/** Color configuration for the badge */
		colors?: ColorConfig;
		/** Whether to hide the dot indicator */
		'no-dot'?: boolean;
		/** @deprecated Use colors.dot instead */
		color?: string;
	}

	/** Text content of the badge */
	export let text = '';
	/** Color configuration for the badge */
	export let colors: ColorConfig = {};
	/** @deprecated Use colors.dot instead */
	export let color = '';
	/** Whether to show action buttons */
	export let showActions = true;
	/** Size of the badge: 'small' | 'medium' */
	export let size: $$Props['size'] = 'medium';

  const noDot = $$props['no-dot'];

	// Handle deprecated color prop
	$: if (color && !colors.dot) {
		colors = { ...colors, dot: color };
	}
</script>

<div class="fps-Badge-wrapper">
	<div
		class={badge({ hasActions: showActions, size, noDot, class: $$props.class })}
		style:background-color={colors.bg}
		style:color={colors.text}
	>
		{#if !$$props['no-dot']}
			<svg
				width="16"
				height="16"
				viewBox="0 0 16 16"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="fps-Badge-dot"
			>
				<path
					d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z"
					fill={colors.dot || color}
				/>
			</svg>
		{/if}
		<Text emphasis="secondary" size={size}>
      <span style:color={colors.text}>{text}</span>
    </Text>
		{#if showActions}
			<slot name="actions">
				<slot />
			</slot>
		{/if}
	</div>
</div>

<style lang="scss">
	.fps-Badge-wrapper {
		flex: none;
		order: 0;
		flex-grow: 0;
		margin-left: var(--space-2);
	}

	.fps-Badge {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: var(--space-1);
		gap: var(--space-1);
		border: 1px solid var(--figma-color-border);
		border-radius: var(--radius-medium);
		font-family: var(--font-family-default);

		&:where(.fps-size-small) {
			font-size: var(--font-size-1);
			padding: 2px 4px;
		}

		&:where(.fps-size-medium) {
			font-size: var(--font-size-2);
			padding: 4px 6px;
		}

		&:where(.fps-has-actions) {
			padding-right: var(--space-2);
		}

		&:where(.fps-no-dot) {
			padding-left: var(--space-2);
		}
	}

	.fps-Badge-dot {
		flex-shrink: 0;
	}
</style>
