<script lang="ts">
	import { Icon } from '#ui/icon';
	import { createEventDispatcher } from 'svelte';
	import { Layer } from '../layer';
	import type { LayerTreeData } from './layer-tree.svelte';
	import { selectedNodeStore } from './store';

	const dispatch = createEventDispatcher<{
		select: LayerTreeData;
		toggle: { node: LayerTreeData; expanded: boolean };
	}>();

	export let data: LayerTreeData;
	export let expandedNodes: Set<string>;
	export let singleSelect: boolean = false;
	export let clickable: boolean = true;
	export let collapsable: boolean = true;
	export let collapsableRoot: boolean = true;
	export let isRoot: boolean = false;
	let selected: boolean = false;

	if (singleSelect) {
		selectedNodeStore.subscribe((selectedId) => {
			selected = selectedId === data.id;
		});
	}

	$: showChevron = data.children?.length > 0 && (isRoot ? collapsableRoot : collapsable);

	function toggleExpand(node: LayerTreeData) {
		if (expandedNodes.has(node.id)) {
			if (!node.matches && !node.children?.some((child) => child.matches)) {
				expandedNodes.delete(node.id);
			}
		} else {
			expandedNodes.add(node.id);
		}
		expandedNodes = new Set(expandedNodes);
		dispatch('toggle', { node, expanded: expandedNodes.has(node.id) });
	}
</script>

<div class="layerTree" class:disabled={data.disabled} class:mixed={data.mixed}>
	<div
		class="layerTree--header"
		style:padding-left="{data.depth ?? 1 * 16}px"
		style:opacity={data.opacity || 1}
	>
		{#if data.children?.length > 0}
			{#if showChevron}
				<button
					class="layerTree--caret"
					on:click|stopPropagation={() => !data.disabled && toggleExpand(data)}
					class:expanded={expandedNodes.has(data.id)}
					class:searching={data.matches || data.children.some((child) => child.matches)}
				>
					{#if expandedNodes.has(data.id)}
						<Icon iconName="ChevronDownSvg_16" />
					{:else}
						<Icon iconName="ChevronRightSvg_16" />
					{/if}
				</button>
			{/if}
		{/if}

		<Layer
			type={data.type}
			name={data.name}
			description={data.description}
			component={data.component}
			{selected}
			actions={data.actions}
			disabled={!clickable}
		/>
	</div>

	{#if expandedNodes.has(data.id) && data.children?.length}
		<div class="layerTree--children">
			{#each data.children as child}
				<svelte:self
					{expandedNodes}
					data={child}
					{singleSelect}
					{clickable}
					{collapsable}
					{collapsableRoot}
					isRoot={false}
					on:select
					on:toggle
				/>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.layerTree {
		width: 100%;
		display: flex;
		flex-direction: column;
		opacity: 1;
		transition: opacity 0.2s ease;
		box-sizing: border-box;
	}

	.layerTree--header {
		display: flex;
		align-items: center;
		width: 100%;
		min-height: 32px;
		box-sizing: border-box;
	}

	.layerTree--caret {
		flex: 0 0 16px;
		height: 16px;
		width: 8px;
		margin-left: -16px;
		padding: 0;
		background: none;
		border: none;
		cursor: pointer;
		color: var(--figma-color-icon-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;

		&:hover {
			color: var(--figma-color-icon);
		}

		&.expanded :global(svg) {
			transform: rotate(0deg);
		}

		:global(svg) {
			transform: rotate(0deg);
			transition: transform 0.2s ease;
		}

		&.searching {
			color: var(--figma-color-icon);
			opacity: 1;
		}
	}

	.layerTree--children {
		width: 100%;
		padding-left: 16px;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		box-sizing: border-box;
	}

	.disabled {
		opacity: 0.5;
	}

	.mixed {
		opacity: 0.75;
	}
</style>
