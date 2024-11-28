<script context="module" lang="ts">
	export const PopoverPlacements = ['top', 'bottom', 'left', 'right'] as const;
	export type PopoverPlacement = (typeof PopoverPlacements)[number];
</script>

<script lang="ts">
	import { Icon } from '$ui';
	import { createPopover, type CreatePopoverProps, melt } from '@melt-ui/svelte';

	type $$Props = CreatePopoverProps;

	export let className = '';
	export let preventScroll = false;
	export let ariaLabel: string | undefined = undefined;
	export let positioning: CreatePopoverProps['positioning'] = {};
	export let showArrow = false;

	const {
		elements: { trigger, content, arrow, close },
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
	<div use:melt={$content} class={`fps-popover__container ${className}`}>
		{#if showArrow}<div use:melt={$arrow} />{/if}
		<div class="fps-popover__header">
			<slot name="header" class="fps-popover__title" />
			<button class="fps-popover__controls" use:melt={$close}>
				<slot name="close-icon">
					<Icon icon="CloseSvg" />
				</slot>
			</button>
		</div>
		<div class="fps-popover__section">
			<slot />
		</div>
	</div>
{/if}

<style lang="scss">
	.fps-popover__container {
		--arrow-size: var(--space-3);
		font-family: var(--font-family-default);
		color: var(--color-text);
		background-color: var(--color-bg-menu);
		border-radius: var(--radius-large);
		box-shadow: var(--elevation-400-menu-panel);
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
		background-color: var(--color-overlay-dialog);
	}
</style>
