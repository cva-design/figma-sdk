<script context="module" lang="ts">
	export const PopoverPlacements = ['top', 'bottom', 'left', 'right'] as const;
	export type PopoverPlacement = (typeof PopoverPlacements)[number];
</script>

<script lang="ts">
	import { createPopover, type CreatePopoverProps, melt } from '@melt-ui/svelte';
	import { Icon } from '../icon';

	interface PopoverProps extends CreatePopoverProps {
		className?: string;
		ariaLabel?: string;
		showArrow?: boolean;
		showCloseButton?: boolean;
		showHeader?: boolean;
	}

	type $$Props = PopoverProps;

	export let className = '';
	export let preventScroll = false;
	export let ariaLabel: string | undefined = undefined;
	export let positioning: CreatePopoverProps['positioning'] = {};
	export let showArrow = false;
	export let showCloseButton = false;
	export let showHeader = false;

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open }
	} = createPopover({
		positioning,
		defaultOpen: $$props.open,
		preventScroll
	});
</script>

<button type="button" class="trigger" use:melt={$trigger} aria-label={ariaLabel}>
	<slot name="trigger" />
</button>

{#if $open}
	<!-- 
    Use this to add a background overlay, like in a modal, to the popover
    <div use:melt={$overlay} class="fps-popover__overlay" />
  -->
	<div use:melt={$content} class={`fps-popover__container ${className}`}>
		{#if showArrow}<div use:melt={$arrow} />{/if}
		{#if showHeader}
			<div class="fps-popover__header">
				<slot name="title" class="fps-popover__title" />
				{#if showCloseButton}
					<slot name="close-button">
						<button class="fps-popover__controls" use:melt={$close}>
							<Icon iconName="CloseSvg" />
						</button>
					</slot>
				{/if}
			</div>
		{/if}
		<div class="fps-popover__section">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	.fps-popover__container {
		--arrow-size: var(--space-3);
		font-family: var(--font-family-default);
		color: var(--color-text-menu);
		background-color: var(--color-bg);
		border-radius: var(--radius-large);
		box-shadow: var(--elevation-500-modal-window);
		outline: 0;
		padding: var(--spacer-2);
		border-radius: var(--radius-large);
	}

	.fps-popover__header {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		height: var(--space-10);
		padding: var(--space-1) var(--space-2);
		border-bottom: 1px solid var(--color-border-menu);
	}

	.fps-popover__title {
		padding-left: var(--space-2);
	}

	.fps-popover__controls {
		display: flex;
		align-items: center;
		margin-left: auto;
		color: var(--color-text-menu);

		&:hover {
			background-color: var(--color-bg-menu-hover);
			border-radius: var(--radius-medium);
		}
	}

	.fps-popover__section {
		box-sizing: border-box;
		padding: var(--space-4);
		border-bottom: 1px solid var(--figma-color-border);

		&:where(:last-child) {
			border-bottom: 0;
		}

		&:where(.fps-popover__section--base) {
			padding: var(--space-4);
		}

		&:where(.fps-popover__section--small) {
			padding: var(--space-2) var(--space-4);
		}
	}

	.fps-popover__overlay {
		position: fixed;
		inset: 0;
		background-color: var(--color-bg);
	}
</style>
