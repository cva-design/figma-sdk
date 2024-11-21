<script context="module" lang="ts">
	export const PopoverPlacements = ['top', 'bottom', 'left', 'right'] as const;
	export type PopoverPlacement = (typeof PopoverPlacements)[number];
</script>

<script lang="ts">
	import './popover.css';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let isOpen = false;
	export let placement: PopoverPlacement = 'top';
	export let offset = 8;
	export let className = '';

	let containerElement: HTMLDivElement;
	let popoverElement: HTMLDivElement;
	const dispatch = createEventDispatcher();

	function updatePosition() {
		if (!containerElement || !popoverElement) return;

		const anchorRect = containerElement.getBoundingClientRect();
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

	function handleClick() {
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		if (
			popoverElement &&
			!popoverElement.contains(event.target as Node) &&
			!containerElement.contains(event.target as Node)
		) {
			isOpen = false;
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

<div bind:this={containerElement} class="fp-Popover-container" on:click={handleClick}>
	<slot name="trigger" />
	
	{#if isOpen}
		<div
			bind:this={popoverElement}
			class={`fp-Popover fp-placement-${placement} ${className}`}
			transition:fade={{ duration: 150 }}
		>
			<slot />
		</div>
	{/if}
</div>
