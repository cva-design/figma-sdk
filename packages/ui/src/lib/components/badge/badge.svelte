<script lang="ts">
	import type { Color } from '#lib/types/colors';
	import { getIconProps, Icon, type IconProps } from '#ui/icon';
	import Text from '#ui/typography/text.svelte';
	import { cva, type VariantProps } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const badge = cva('fps-badge', {
		variants: {
			hasActions: {
				true: 'fps-has-actions'
			},
			size: {
				small: 'fps-badge-small',
				medium: 'fps-badge-medium'
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
		dot?: Color;
		/** Background color of the badge */
		bg?: Color;
		/** Text color of the badge */
		text?: Color;
		/** Border color of the badge */
		border?: Color;
	}

	type $$Props = Partial<IconProps> &
		HTMLAttributes<HTMLButtonElement> &
		VariantProps<typeof badge> & {
			/** Text content of the badge */
			text?: string;
			/** Color configuration for the badge or a string to be used for all colors except bg */
			colors?: ColorConfig | Color;
			/** Whether to hide the dot indicator */
			'no-dot'?: boolean;
			/** @deprecated Use colors.dot instead */
			color?: Color;
		};

	/** Text content of the badge */
	export let text = '';
	/** Color configuration for the badge */
	export let colors: ColorConfig | Color = {};
	/** @deprecated Use colors.dot instead */
	export let color: Color = 'currentColor';
	/** Whether to show action buttons */
	export let showActions = true;
	/** Size of the badge: 'small' | 'medium' */
	export let size: $$Props['size'] = 'medium';

	const noDot = $$props['no-dot'];

	// Handle deprecated color prop and string colors
	$: colorConfig =
		typeof colors === 'string' ? { dot: colors, text: colors, border: colors } : colors;
	$: if (color && !colorConfig.dot) {
		colorConfig = { ...colorConfig, dot: color };
	}

	$: hasIconProps = $$props.iconName || $$props.icon || $$props.iconText;
	$: iconProps = getIconProps({ ...$$props, color: colorConfig.dot || color });
	$: if (iconProps && $$props.spin) {
		iconProps = { ...iconProps, spin: $$props.spin };
	}

	const dispatch = createEventDispatcher<{
		click: MouseEvent;
	}>();

	/** @internal */
	function handleClick(event: MouseEvent) {
		// Only stop propagation if click was on action buttons
		const actionButton = (event.target as HTMLElement).closest('.fps-badge-actions');
		if (actionButton) {
			event.stopPropagation();
			return;
		}

		// Forward the click event
		dispatch('click', event);
	}

	/** @internal */
	function handleKeyDown(event: KeyboardEvent) {
		// Only handle keyboard events on the badge itself, not on action buttons
		if ((event.target as HTMLElement).closest('.fps-badge-actions')) {
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
		}
	}
</script>

<div class="fps-badge-wrapper">
	<button
		class={badge({ hasActions: showActions, size, noDot, class: $$props.class })}
		style:background-color={colorConfig.bg}
		style:color={colorConfig.text}
		style:border-color={colorConfig.border}
		on:click={handleClick}
		on:keydown={handleKeyDown}
		on:mouseenter
		on:mouseleave
		on:focus
		on:blur
		on:keyup
		on:keypress
		on:mousedown
		on:mouseup
		on:mousemove
		on:mouseover
		on:mouseout
		on:pointerdown
		on:pointerup
		on:pointermove
		on:pointerenter
		on:pointerleave
		on:pointerover
		on:pointerout
		on:pointercancel
		on:contextmenu
		on:dblclick
		type="button"
	>
		{#if !$$props['no-dot']}
			{#if iconProps}
				<div class="fps-badge-icon">
					<Icon {...iconProps} />
				</div>
			{:else}
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="fps-badge-dot"
				>
					<path
						d="M12 8C12 10.2091 10.2091 12 8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8Z"
						fill={colorConfig.dot || color}
					/>
				</svg>
			{/if}
		{/if}
		<Text emphasis="secondary" {size} pointerEvents="none">
			<span style:color={colorConfig.text} style:pointer-events="none">{text}</span>
		</Text>
		{#if showActions}
			<div class="fps-badge-actions">
				<slot name="actions">
					<slot />
				</slot>
			</div>
		{/if}
	</button>
</div>

<style lang="scss">
	.fps-badge-wrapper {
		display: flex;
		flex: none;
		order: 0;
		flex-grow: 0;
		margin-left: var(--spacer-2);
		color: var(--color-text);
		height: var(--spacer-4);

		&:where(.fps-badge-small) {
			height: 20px;
		}

		:global(button) {
			background: none;
			padding: 0;
			border: none;
			font: inherit;
			outline: inherit;
			cursor: pointer;
		}
	}

	.fps-badge {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: var(--spacer-1);
		border: 1px solid var(--figma-color-border);
		border-radius: var(--radius-medium);
		height: var(--spacer-4);
		box-sizing: border-box;

		&:where(.fps-badge-small) {
			padding: 0 4px;
			height: 20px;

			.fps-badge-icon {
				width: 16px;
				height: 16px;
			}

			.fps-badge-actions {
				overflow: hidden;

				:global(button) {
					width: 16px;
					height: 16px;
					display: flex;
					align-items: center;
				}
			}
		}

		&:where(.fps-badge-medium) {
			// font-size: var(-text-body-medium-font-size);
			padding: 0 6px;
		}

		&:where(.fps-has-actions) {
			padding-right: var(--spacer-1);
		}

		&:where(.fps-no-dot) {
			padding-left: var(--spacer-2);
		}

		.fps-badge-actions {
			display: flex;
			align-items: center;
			gap: var(--spacer-1);
			height: 100%;
		}
	}

	.fps-badge-dot {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
	}

	.fps-badge-icon {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		display: flex;
		align-items: center;
		justify-content: center;

		:global(svg) {
			width: 100%;
			height: 100%;
		}
	}

	:global(.fps-badge [slot='actions']) {
		display: flex;
		align-items: center;
		gap: var(--spacer-1);
		height: 100%;
	}
</style>
