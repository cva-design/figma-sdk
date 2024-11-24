<script lang="ts">
	import { Button } from '$ui/button';
	import { Icon } from '$ui/icon';
	import { slide } from 'svelte/transition';

	export let class_: string | undefined = undefined;
	export let fullWidth: boolean = false;
	export let collapsible: boolean = false;

	let isExpanded = false;

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
			<div class="fps-TabsList {fullWidth ? 'full-width' : ''} {class_ || ''}" transition:slide>
				<slot />
			</div>
		{/if}
	</div>
{:else}
	<div class="fps-TabsList {fullWidth ? 'full-width' : ''} {class_ || ''}">
		<slot />
	</div>
{/if}

<style lang="scss">
	.fps-TabsList {
		display: flex;
		overflow-y: auto;
		gap: var(--space-2);

		&.full-width {
			width: 100%;

			:global(.fps-TabsTrigger) {
				flex: 1;
				width: 100% !important; // Override the fixed width
			}
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
