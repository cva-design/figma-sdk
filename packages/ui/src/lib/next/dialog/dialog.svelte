<script lang="ts">
import { createEventDispatcher } from "svelte";
import { fade } from "svelte/transition";
import IconButton from "../icon-button/icon-button.svelte";
import Icon from "../icon/icon.svelte";

export let open = false;

export const size: "1" | "2" | "3" | "fullscreen" = "2";
export const placement: "center" | "top" = "top";
export const width: string | undefined = undefined;
export const height: string | undefined = undefined;
export const maxWidth: string | undefined = undefined;
export const maxHeight: string | undefined = undefined;
export const title: string | undefined = undefined;
export const titleWeight: "normal" | "strong" = "strong";

const dispatch = createEventDispatcher();

function handleClose() {
	open = false;
	dispatch("close");
}

$: style = [
	width && `width: ${width}`,
	height && `height: ${height}`,
	maxWidth && `max-width: ${maxWidth}`,
	maxHeight && `max-height: ${maxHeight}`,
]
	.filter(Boolean)
	.join(";");
</script>

{#if open}
	<div class="fps-DialogBaseOverlay" on:click={handleClose} transition:fade={{ duration: 150 }} />

	<div
		class="fps-DialogBaseContent fps-DialogContent fps-size-{size} fps-placement-{placement} {$$props.class}"
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
			<h2 class="fps-DialogBaseTitle" class:strong={titleWeight === 'strong'}>
				{title}
			</h2>
		{/if}
		<slot name="title" />
		<slot />
	</div>
{/if}

<style lang="scss">
	.fps-DialogBaseOverlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.fps-DialogContent {
		position: fixed;
		max-width: calc(100vw - 32px);
		max-height: 80%;
		background: gray;
		border-radius: 6px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		z-index: 1001;
		padding: 20px;

		&:global(.fps-placement-center) {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		&:global(.fps-placement-top) {
			top: min(10vh, 80px);
			left: 50%;
			transform: translateX(-50%);
		}

		&:global(.fps-size-1) {
			width: 288px;
		}

		&:global(.fps-size-2) {
			width: 352px;
		}

		&:global(.fps-size-3) {
			width: 448px;
		}

		&:global(.fps-size-fullscreen) {
			inset: 0;
			border-radius: 0;
		}
	}

	.close-button {
		position: absolute;
		top: 12px;
		right: 12px;
	}

	.fps-DialogBaseTitle {
		margin: 0 0 16px 0;
		font-size: 16px;
		line-height: 1.4;
	}

	.strong {
		font-weight: 600;
	}
</style>
