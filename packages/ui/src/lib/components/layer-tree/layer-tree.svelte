<script lang="ts" context="module">
	import type { Action as ActionType } from '../tree/types';
	import './layer-tree.css';
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
	import Layer from '../layer/layer.svelte';
	import type { LayerType } from '../layer/types';

	const dispatch = createEventDispatcher<{
		select: LayerTreeData;
		toggle: { node: LayerTreeData; expanded: boolean };
	}>();

	export let data: LayerTreeData;
	export let expandedNodes: Set<string> = new Set();
	export let initiallyExpanded = false;

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
		if (node.click) {
			console.log('node.click', node.click);
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
		<div 
			class="layerTree--header" 
			style:padding-left="{renderedTree.depth * 16}px"
		>
			{#if renderedTree.children?.length > 0}
				<button
					class="layerTree--caret"
					on:click|stopPropagation={() => toggleExpand(renderedTree)}
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
				selected={renderedTree.selected}
				actions={renderedTree.actions}
				on:click={(e) => handleNodeClick(e, renderedTree)}
			/>
		</div>

		{#if expandedNodes.has(renderedTree.id) && renderedTree.children?.length}
			<div class="layerTree--children">
				{#each renderedTree.children as child}
					<svelte:self data={child} {expandedNodes} on:select on:toggle />
				{/each}
			</div>
		{/if}
	</div>
</div>
