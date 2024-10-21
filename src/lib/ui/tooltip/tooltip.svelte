<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let content: string;
	export let position: 'top' | 'right' | 'bottom' | 'left' = 'top';
	export let className: string = '';

	const dispatch = createEventDispatcher();

	let isVisible = false;

	function showTooltip() {
		isVisible = true;
		dispatch('show');
	}

	function hideTooltip() {
		isVisible = false;
		dispatch('hide');
	}

	$: classes = [
		'fp-Tooltip',
		`fp-Tooltip--${position}`,
		isVisible ? 'fp-Tooltip--visible' : '',
		className
	]
		.filter(Boolean)
		.join(' ');
</script>

<div
	class={classes}
	on:mouseenter={showTooltip}
	on:mouseleave={hideTooltip}
	on:focusin={showTooltip}
	on:focusout={hideTooltip}
>
	<slot />
	{#if isVisible}
		<div class="fp-Tooltip-content">
			{content}
		</div>
	{/if}
</div>

<style src="./tooltip.css"></style>
