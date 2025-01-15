<script lang="ts">
	import { createTooltip } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import type { TooltipPosition } from './types';

	export let content: string | HTMLElement;
	export let position: TooltipPosition = 'top';
	export let className: string = '';
	export let openDelay: number = 1000;
	export let closeDelay: number = 500;
	export let disableHoverableContent: boolean = false;
	export let defaultOpen: boolean = false;
	export let forceVisible: boolean = false;
	export let closeOnPointerDown: boolean = true;
	export let arrowSize: number = 8;
	export let group: string | boolean = false;

	const dispatch = createEventDispatcher();

	const {
		elements: { trigger, content: tooltipContent, arrow },
		states: { open: isOpen }
	} = createTooltip({
		positioning: {
			placement: position,
			gutter: 8,
			overflowPadding: 8
		},
		arrowSize,
		openDelay,
		closeDelay,
		disableHoverableContent,
		closeOnPointerDown,
		defaultOpen,
		forceVisible,
		group,
		onOpenChange: ({ curr, next }) => {
			dispatch('openChange', { open: next });
			dispatch(next ? 'show' : 'hide');
			return next;
		}
	});

	$: classes = [
		'fps-tooltip',
		position && `fps-tooltip--${position}`,
		$isOpen ? 'fps-tooltip--visible' : '',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<div class="fps-tooltip-wrapper" {...$trigger} use:$trigger.action>
	<slot />
</div>

{#if $isOpen || forceVisible}
	<div {...$tooltipContent} use:$tooltipContent.action class={classes}>
		{content}
		<div {...$arrow} use:$arrow.action class="fps-tooltip-arrow" />
	</div>
{/if}

<style lang="scss">
	.fps-tooltip-wrapper {
		position: relative;
		display: inline-block;
	}

	.fps-tooltip {
		position: absolute;
		z-index: 1000;
		box-sizing: border-box;
		padding: var(--space-1) var(--space-2);
		background-color: var(--color-bg);
		font-family: var(--font-family-default);
		font-size: var(--font-size-default);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--letter-spacing-default);
		line-height: var(--line-height-default);
		min-height: var(--space-6);
		color: var(--color-text);
		white-space: pre-wrap;
		word-break: break-word;
		border-radius: var(--radius-medium);
		box-shadow: var(--elevation-300, 0 2px 7px rgba(0, 0, 0, 0.15));
	}

	.fps-tooltip-arrow {
		fill: var(--color-bg);
		width: var(--space-3_5);
		height: var(--space-1_5);
		position: relative;
	}
</style>
