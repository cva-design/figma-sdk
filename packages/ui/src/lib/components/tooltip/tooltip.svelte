<script lang="ts">
	import { createTooltip, melt } from '@melt-ui/svelte';
	import { createEventDispatcher } from 'svelte';
	import type { TooltipPosition } from './types';

	export let content: string | HTMLElement;
	export let position: TooltipPosition = 'top';
	export let className = '';
	export let openDelay = 1000;
	export let closeDelay = 500;
	export let disableHoverableContent = false;
	export let defaultOpen = false;
	export let forceVisible = false;
	export let closeOnPointerDown = true;
	export let arrowSize = 8;
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
		'fp-tooltip',
		position && `fp-tooltip--${position}`,
		$isOpen ? 'fp-tooltip--visible' : '',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<div class="fp-tooltip-wrapper" use:melt={$trigger}>
	<slot />
</div>

{#if $isOpen || forceVisible}
	<div use:melt={$tooltipContent} class={classes}>
		{content}
		<div use:melt={$arrow} class="fp-tooltip-arrow" />
	</div>
{/if}

<style lang="scss">
.fp-tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.fp-tooltip {
  position: absolute;
  z-index: 1000;
  box-sizing: border-box;
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-bg-tooltip);
  font-family: var(--font-family-default);
  font-size: var(--font-size-default);
  font-weight: var(--font-weight-default);
  letter-spacing: var(--letter-spacing-default);
  line-height: var(--line-height-default);
  min-height: var(--space-6);
  color: var(--color-text-tooltip);
  white-space: pre-wrap;
  word-break: break-word;
  border-radius: var(--radius-medium);
  box-shadow: var(--elevation-300, 0 2px 7px rgba(0, 0, 0, 0.15));
}

.fp-tooltip-arrow {
  fill: var(--color-bg-tooltip);
  width: var(--space-3_5);
  height: var(--space-1_5);
  position: relative;
}</style>
