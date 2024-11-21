<script lang="ts">
	import './tooltip.css';
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
