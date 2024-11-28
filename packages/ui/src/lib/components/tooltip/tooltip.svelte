<script lang="ts">
import { createTooltip, melt } from "@melt-ui/svelte";
import { createEventDispatcher } from "svelte";
import type { TooltipPosition } from "./types";

export let content: string | HTMLElement;
export const position: TooltipPosition = "top";
export const className: string = "";
export const openDelay: number = 1000;
export const closeDelay: number = 500;
export const disableHoverableContent: boolean = false;
export const defaultOpen: boolean = false;
export const forceVisible: boolean = false;
export const closeOnPointerDown: boolean = true;
export const arrowSize: number = 8;
export const group: string | boolean = false;

const dispatch = createEventDispatcher();

const {
	elements: { trigger, content: tooltipContent, arrow },
	states: { open: isOpen },
} = createTooltip({
	positioning: {
		placement: position,
		gutter: 8,
		overflowPadding: 8,
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
		dispatch("openChange", { open: next });
		dispatch(next ? "show" : "hide");
		return next;
	},
});

$: classes = [
	"fps-tooltip",
	position && `fps-tooltip--${position}`,
	$isOpen ? "fps-tooltip--visible" : "",
	className,
]
	.filter(Boolean)
	.join(" ");
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

	.fps-tooltip-arrow {
		fill: var(--color-bg-tooltip);
		width: var(--space-3_5);
		height: var(--space-1_5);
		position: relative;
	}
</style>
