<script lang="ts" context="module">
	import type { Action as ActionType } from './action.svelte';
	export type LayerTreeData = {
		id: string;
		children: LayerTreeData[];
		type: LayerType;
		name: string;
		description?: string;
		component?: boolean;
		selected?: boolean;
		expanded?: boolean;
		actions?: ActionType[];
		depth?: number;
		mixed?: boolean;
		disabled?: boolean;
		click?: (event: Event, node: LayerTreeData) => void;
	};
</script>

<script lang="ts">
	import { Icon } from '$ui/icon';
	import { createEventDispatcher, onMount } from 'svelte';
	import { Layer } from '../layer';
	import type { LayerType } from '../../components/layer/types';
	import { selectedNodeStore } from './store';

	const dispatch = createEventDispatcher<{
		select: LayerTreeData;
		toggle: { node: LayerTreeData; expanded: boolean };
	}>();

	export let data: LayerTreeData;
	export let expandedNodes: Set<string> = new Set();
	export let initiallyExpanded: boolean = false;
	export let singleSelect: boolean = false;
	let selected: boolean = false;
	if (singleSelect) {
		selectedNodeStore.subscribe((selectedId) => {
			selected = selectedId === data.id;
		});
	}
	function expandAll(node: LayerTreeData) {
		expandedNodes.add(node.id);
		node.children?.forEach(expandAll);
		expandedNodes = expandedNodes; // Trigger reactivity
	}

	onMount(() => {
		if (initiallyExpanded) {
			expandAll(data);
		}
	});

	function toggleExpand(node: LayerTreeData) {
		if (expandedNodes.has(node.id)) {
			expandedNodes.delete(node.id);
		} else {
			expandedNodes.add(node.id);
		}
		expandedNodes = new Set(expandedNodes); // Create new Set to trigger reactivity
		dispatch('toggle', { node, expanded: expandedNodes.has(node.id) });
	}

	function handleNodeClick(event: Event, node: LayerTreeData) {
		if (!node.disabled && singleSelect) {
			selectedNodeStore.update((nodeId) => {
				if (nodeId === node.id) {
					return null; // Deselect if clicking the same node
				}
				// If another node was selected, deselect it and select the new one
				return node.id;
			});
		}
		if (node.click) {
			node.click(event, node);
		}
		dispatch('select', node);
	}

	function renderNode(node: LayerTreeData, depth: number = 0) {
		const isExpanded = expandedNodes.has(node.id);
		return {
			...node,
			depth,
			expanded: isExpanded,
			children: node.children?.map((child) => renderNode(child, depth + 1)) || []
		};
	}

	$: renderedTree = renderNode(data);
</script>

<div class="layerTree-container">
	<div class="layerTree" class:disabled={renderedTree.disabled} class:mixed={renderedTree.mixed}>
		<div class="layerTree--header" style:padding-left="{renderedTree.depth * 16}px">
			{#if renderedTree.children?.length > 0}
				<button
					class="layerTree--caret"
					on:click|stopPropagation={() => !renderedTree.disabled && toggleExpand(renderedTree)}
					class:expanded={renderedTree.expanded}
				>
					{#if renderedTree.expanded}
						<Icon icon="ChevronDownSvg_16" />
					{:else}
						<Icon icon="ChevronRightSvg_16" />
					{/if}
				</button>
			{/if}

			<Layer
				type={renderedTree.type}
				name={renderedTree.name}
				description={renderedTree.description}
				component={renderedTree.component}
				{selected}
				actions={data.actions}
				onClick={(e) => handleNodeClick(e, renderedTree)}
			/>
		</div>

		{#if expandedNodes.has(renderedTree.id) && renderedTree.children?.length}
			<div class="layerTree--children">
				{#each renderedTree.children as child}
					<svelte:self data={child} {expandedNodes} {singleSelect} on:select on:toggle />
					<slot />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.layerTree-container {
		width: 100%;
	}

	.layerTree {
		width: 100%;
	}

	.layerTree--header {
		display: flex;
		align-items: center;
		width: 100%;
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
		width: 100%;
		padding-left: 16px;
	}

	.disabled {
		opacity: 0.5;
	}

	.mixed {
		opacity: 0.75;
	}
</style>
