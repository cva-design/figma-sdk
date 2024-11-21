<script lang="ts">
	import './dialog.css';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import IconButton from '../icon-button/icon-button.svelte';
	import Icon from '../icon/icon.svelte';

	export let open = false;

	export let size: '1' | '2' | '3' | 'fullscreen' = '2';
	export let placement: 'center' | 'top' = 'top';
	export let width: string | undefined = undefined;
	export let height: string | undefined = undefined;
	export let maxWidth: string | undefined = undefined;
	export let maxHeight: string | undefined = undefined;
	export let title: string | undefined = undefined;
	export let titleWeight: 'normal' | 'strong' = 'strong';

	const dispatch = createEventDispatcher();

	function handleClose() {
		open = false;
		dispatch('close');
	}

	$: style = [
		width && `width: ${width}`,
		height && `height: ${height}`,
		maxWidth && `max-width: ${maxWidth}`,
		maxHeight && `max-height: ${maxHeight}`
	]
		.filter(Boolean)
		.join(';');
</script>

{#if open}
	<div class="fp-DialogBaseOverlay" on:click={handleClose} transition:fade={{ duration: 150 }} />

	<div 
		class="fp-DialogBaseContent fp-DialogContent fp-size-{size} fp-placement-{placement} {$$props.class}"
		{style}
		role="dialog"
		aria-modal="true"
		on:click|stopPropagation
		transition:fade={{ duration: 150 }}
	>
		<slot name="close">
			<IconButton class="close-button" on:click={handleClose} aria-label="Close">
				<Icon icon="CloseSvg" />
			</IconButton>
		</slot>

		{#if title}
			<h2 class="fp-DialogBaseTitle" class:strong={titleWeight === 'strong'}>
				{title}
			</h2>
		{/if}
		<slot name="title" />
		<slot />
	</div>
{/if}
