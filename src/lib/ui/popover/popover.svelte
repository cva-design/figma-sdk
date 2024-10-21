<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let isOpen = false;
	export let anchor: HTMLElement | null = null;
	export let placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
	export let offset = 8;
	export let className = '';

	let popoverElement: HTMLDivElement;
	const dispatch = createEventDispatcher();

	function updatePosition() {
		if (!anchor || !popoverElement) return;

		const anchorRect = anchor.getBoundingClientRect();
		const popoverRect = popoverElement.getBoundingClientRect();

		let top = 0;
		let left = 0;

		switch (placement) {
			case 'top':
				top = anchorRect.top - popoverRect.height - offset;
				left = anchorRect.left + (anchorRect.width - popoverRect.width) / 2;
				break;
			case 'bottom':
				top = anchorRect.bottom + offset;
				left = anchorRect.left + (anchorRect.width - popoverRect.width) / 2;
				break;
			case 'left':
				top = anchorRect.top + (anchorRect.height - popoverRect.height) / 2;
				left = anchorRect.left - popoverRect.width - offset;
				break;
			case 'right':
				top = anchorRect.top + (anchorRect.height - popoverRect.height) / 2;
				left = anchorRect.right + offset;
				break;
		}

		popoverElement.style.top = `${top}px`;
		popoverElement.style.left = `${left}px`;
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			popoverElement &&
			!popoverElement.contains(event.target as Node) &&
			event.target !== anchor
		) {
			dispatch('close');
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		window.addEventListener('resize', updatePosition);
		updatePosition();
	});

	onDestroy(() => {
		document.removeEventListener('click', handleClickOutside);
		window.removeEventListener('resize', updatePosition);
	});

	$: if (isOpen) {
		setTimeout(updatePosition, 0);
	}
</script>

{#if isOpen}
	<div
		bind:this={popoverElement}
		class={`fp-Popover fp-placement-${placement} ${className}`}
		transition:fade={{ duration: 150 }}
	>
		<slot />
	</div>
{/if}

<style>
	.fp-Popover {
		position: fixed;
		z-index: 1000;
		background-color: var(--figma-color-bg);
		border-radius: 2px;
		box-shadow: var(--figma-shadow-floating);
		padding: 8px;
	}

	.fp-Popover.fp-placement-top {
		transform-origin: bottom center;
	}

	.fp-Popover.fp-placement-bottom {
		transform-origin: top center;
	}

	.fp-Popover.fp-placement-left {
		transform-origin: right center;
	}

	.fp-Popover.fp-placement-right {
		transform-origin: left center;
	}
</style>
