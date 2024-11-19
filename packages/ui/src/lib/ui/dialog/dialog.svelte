<script lang="ts">
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

<style lang="scss">
	.fp-DialogBaseOverlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.fp-DialogContent {
		position: fixed;
		max-width: calc(100vw - 32px);
		max-height: 80%;
		background:gray;
		border-radius: 6px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 1001;
		padding: 20px;

		&:global(.fp-placement-center) {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		&:global(.fp-placement-top) {
			top: min(10vh, 80px);
			left: 50%;
			transform: translateX(-50%);
		}

		&:global(.fp-size-1) {
			width: 288px;
		}

		&:global(.fp-size-2) {
			width: 352px;
		}

		&:global(.fp-size-3) {
			width: 448px;
		}

		&:global(.fp-size-fullscreen) {
			inset: 0;
			border-radius: 0;
		}
	}

	.close-button {
		position: absolute;
		top: 12px;
		right: 12px;
	}

	.fp-DialogBaseTitle {
		margin: 0 0 16px 0;
		font-size: 16px;
		line-height: 1.4;
	}

	.strong {
		font-weight: 600;
	}
</style>
