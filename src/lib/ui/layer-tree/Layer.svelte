<script lang="ts">
	import { Text } from '$ui';
	import type { LayerType } from '../layer/types';
	import { LayerIcon } from '../layer/types';

	export let type: LayerType;
	export let name: string;
	export let description: string | undefined = undefined;
	export let component: boolean = false;
	export let selected: boolean = false;
	export let actions: Array<{
		id: string;
		icon: string;
		tooltip: string;
		active?: boolean;
		enabled?: boolean;
	}> = [];

	import Action from './Action.svelte';

	$: iconUrl = LayerIcon[type];
</script>

<div class="layer" class:component class:selected>
	<span class="layer--icon">
		{@html iconUrl}
	</span>

	<Text class="layer--name" size="medium">{name}</Text>

	{#if description}
		<Text class="layer--description">{description}</Text>
	{/if}

	{#if actions.length > 0}
		<span class="layer--actions">
			{#each actions as action (action.id)}
				<Action {action} on:click />
			{/each}
		</span>
	{/if}
</div>

<style>
	.layer {
		display: flex;
		align-items: center;
		padding: 0 8px;
		height: 32px;
		border-radius: var(--radius-medium);
	}

	.layer--icon {
		flex: 0 0 16px;
		height: 16px;
		margin-right: 8px;
		color: var(--figma-color-icon-secondary);
	}

	.layer--name {
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.layer--description {
		margin-left: 8px;
		color: var(--figma-color-text-secondary);
	}

	.layer--actions {
		display: flex;
		margin-left: auto;
	}

	.layer.selected {
		background: var(--figma-color-bg-selected);
	}

	.layer.component {
		color: var(--figma-color-text-component);
	}

	.layer.component .layer--icon {
		color: var(--figma-color-icon-component);
	}
</style>
