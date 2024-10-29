<script lang="ts" context="module">
	import type { Action as ActionType } from '../tree/types';
	export type LayerTreeData = {
		children: LayerTreeData[];
		type: LayerType;
		name: string;
		description?: string | undefined;
		component?: boolean;
		selected?: boolean;
		expanded?: boolean;
		actions?: ActionType[];
		depth?: number;
	};
</script>

<script lang="ts">
	import { ChevronDownSvg_16, ChevronRightSvg_16 } from '$icons';
	import type { LayerType } from '../layer/types';
	import Layer from './Layer.svelte';

	export let tree: LayerTreeData | undefined | null;
	export let type: LayerType;
	export let name: string;
	export let description: string | undefined = undefined;
	export let component: boolean = false;
	export let selected: boolean = false;
	export let expanded: boolean = false;
	export let actions: ActionType[] = [];
	export let depth: number = 0;

	function toggleExpand() {
		expanded = !expanded;
	}
</script>

{#if tree}
	<div class="layerTree" style="--depth: {depth}">
		<div class="layerTree--header">
			{#if tree.children.length > 0}
				<button class="layerTree--caret" on:click={toggleExpand} class:expanded>
					{@html expanded ? ChevronDownSvg_16 : ChevronRightSvg_16}
				</button>
			{/if}

			<Layer
				type={tree.type}
				name={tree.name}
				description={tree.description}
				component={tree.component}
				selected={tree.selected}
				actions={tree.actions}
				on:click
			/>
		</div>

		{#if expanded}
			<div class="layerTree--children">
				{#each tree.children as child}
					<svelte:self tree={child} depth={depth + 1} />
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<div class="layerTree" style="--depth: {depth}">
		<div class="layerTree--header">
			<button class="layerTree--caret" on:click={toggleExpand} class:expanded>
				{@html expanded ? ChevronDownSvg_16 : ChevronRightSvg_16}
			</button>

			<Layer {type} {name} {description} {component} {selected} {actions} on:click />
		</div>

		{#if expanded}
			<div class="layerTree--children">
				<slot />
			</div>
		{/if}
	</div>
{/if}

<style>
	.layerTree {
		padding-left: calc(var(--depth) * -8px);
	}

	.layerTree--header {
		display: flex;
		align-items: center;
	}

	.layerTree--caret {
		flex: 0 0 16px;
		height: 16px;
		padding: 0;
		margin-right: 8px;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--figma-color-icon-secondary);
	}

	.layerTree--caret:hover {
		color: var(--figma-color-icon);
	}

	.layerTree--children {
		margin-left: 24px;
	}
</style>
