<script lang="ts">
	import { getIconProps, Icon } from '#ui';
	import { createRadioGroup, melt } from '@melt-ui/svelte';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Segment } from './types';

	const segmentedControl = cva('fps-SegmentedControl', {
		variants: {},
		defaultVariants: {}
	});

	type $$Props = HTMLAttributes<HTMLDivElement> &
		VariantProps<typeof segmentedControl> & {
			/** The segments to display */
			segments: Segment[];
			/** The value of the segmented control */
			value?: string;
			/** The default value of the segmented control */
			defaultValue?: string;
			/** Whether the segmented control is disabled */
			disabled?: boolean;
			/** Whether the segmented control is required */
			required?: boolean;
			/** Whether the segmented control should loop */
			loop?: boolean;
			/** Callback when the value changes */
			onValueChange?: (value: string) => void;
		};

	/** The segments to display */
	export let segments: Segment[] = [];
	/** The value of the segmented control */
	export let value: string | undefined = undefined;
	/** The default value of the segmented control */
	export let defaultValue: string | undefined = undefined;
	/** Whether the segmented control is disabled */
	export let disabled = false;
	/** Whether the segmented control is required */
	export let required = false;
	/** Whether the segmented control should loop */
	export let loop = false;
	/** Callback when the value changes */
	export let onValueChange: ((value: string) => void) | undefined = undefined;

	const {
		elements: { root, item },
		states: { value: selectedValue }
	} = createRadioGroup({
		defaultValue: value || defaultValue || segments[0]?.value || '',
		disabled,
		required,
		loop,
		onValueChange: (details) => {
			console.log('Value changed:', details);
			if (onValueChange) onValueChange(details.next);
			return details.next;
		}
	});

	// Update radio group when value prop changes
	$: if (value !== undefined) {
		selectedValue.set(value);
	}
</script>

<div
	class={segmentedControl({ class: $$props.class })}
	use:melt={$root}
	role="radiogroup"
	{...$$restProps}
>
	{#each segments as segment}
		{@const iconProps = getIconProps(segment)}
		<button
			use:melt={$item(segment.value)}
			class="fps-SegmentedControl-item"
			data-value={segment.value}
			disabled={segment.disabled || disabled}
			title={segment.tooltip}
		>
			{#if iconProps}
				<Icon size={iconProps.size} {...iconProps} />
			{:else if segment.text}
				<span class="fps-SegmentedControl-item-text">{segment.text}</span>
			{/if}
		</button>
	{/each}
</div>

<style lang="scss">
	.fps-SegmentedControl {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		gap: var(--space-px);
		width: fit-content;
		height: var(--space-6);
		padding: var(--space-px);
		background-color: var(--figma-color-bg-secondary);
		border-radius: var(--radius-medium);
	}

	.fps-SegmentedControl-item {
		all: unset;
		display: flex;
		align-items: center;
		justify-content: center;
		width: fit-content;
		flex: 1 0 auto;
		min-width: var(--space-6);
		height: var(--space-6);
		background-color: transparent;
		border-radius: var(--radius-medium);
		font-family: var(--font-family-default);
		font-size: var(--font-size-default);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--letter-spacing-default);
		line-height: var(--line-height-default);
		white-space: nowrap;
		--color-icon: var(--figma-color-icon-secondary);
		cursor: pointer;

		&[data-state='checked'] {
			--color-icon: var(--figma-color-icon);
			background-color: var(--figma-color-bg);
			box-shadow: inset 0 0 0 var(--space-px) var(--figma-color-border);
		}

		&:focus-visible {
			outline: 1px solid var(--figma-color-border-selected);
			outline-offset: -1px;
		}

		&:disabled,
		&[data-disabled] {
			--color-icon: var(--figma-color-icon-disabled);
			cursor: not-allowed;

			:global(.fps-Icon) {
				color: var(--figma-color-icon-disabled);
				fill: var(--figma-color-icon-disabled);
			}
		}
	}

	.fps-SegmentedControl-item-text {
		display: flex;
		align-items: center;
		padding: var(--space-2);
		gap: var(--space-1_5);
	}
</style>
