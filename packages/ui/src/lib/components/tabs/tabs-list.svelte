<script lang="ts">
	import { Button } from '#ui/button';
	import { Icon } from '#ui/icon';
	import { type VariantProps, cva } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	const tabsList = cva('fps-TabsList', {
		variants: {
			fullWidth: {
				true: 'fps-full-width'
			},
			collapsible: {
				true: 'fps-collapsible'
			}
		},
		defaultVariants: {
			fullWidth: false,
			collapsible: false
		}
	});

	interface $$Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsList> {}

	export let fullWidth: $$Props['fullWidth'] = false;
	export let collapsible: $$Props['collapsible'] = false;

	let isExpanded: boolean = false;

	function toggleExpand() {
		isExpanded = !isExpanded;
	}
</script>

{#if collapsible}
	<div class="tabs-wrapper">
		<Button variant="secondary" on:click={toggleExpand} class="toggle-button">
			<Icon icon={isExpanded ? 'CaretDownSvg' : 'CaretRightSvg'} />
			<span class="toggle-text">Show Options</span>
		</Button>

		{#if isExpanded}
			<div class={tabsList({ fullWidth, collapsible, class: $$props.class })} transition:slide>
				<slot />
			</div>
		{/if}
	</div>
{:else}
	<div class={tabsList({ fullWidth, collapsible, class: $$props.class })}>
		<slot />
	</div>
{/if}

<style lang="scss">
	.fps-TabsList {
		display: flex;
		overflow-y: auto;
		gap: var(--space-2);

		&:where(.fps-full-width) {
			width: 100%;

			:global(.fps-TabsTrigger) {
				flex: 1;
				width: 100% !important;
			}
		}

		&:where(.fps-collapsible) {
			flex-direction: column;
		}
	}

	.tabs-wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.toggle-button {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.toggle-text {
		margin-left: var(--space-1);
	}
</style>
