<script lang="ts" context="module">
	import { Input } from '#ui';
	import { cx } from 'class-variance-authority';
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
		matches?: boolean;
		opacity?: number;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import type { LayerType } from '../../components/layer/types';
	import LayerTreeNode from './layer-tree-node.svelte';

	export let data: LayerTreeData;
	export let expandedNodes: Set<string> = new Set();
	export let initiallyExpanded: boolean = false;
	export let singleSelect: boolean = false;
	export let clickable: boolean = false;

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

	// Search functionality
	let searchQuery = '';

	function matchesSearch(node: LayerTreeData): boolean {
		if (!searchQuery) return true;
		const nameMatches = node.name.toLowerCase().includes(searchQuery.toLowerCase());
		const childrenMatch = node.children?.some(matchesSearch);
		return nameMatches || !!childrenMatch;
	}

	function applySearchFilter(node: LayerTreeData, depth: number = 0): LayerTreeData {
		const matches = matchesSearch(node);
		const filteredChildren = node.children
			?.map((child) => applySearchFilter(child, depth + 1))
			.filter((child) => child.matches || child.children?.some((c) => c.matches));

		// Auto-expand parent nodes that contain matches
		if (searchQuery && (matches || filteredChildren?.some((child) => child.matches))) {
			expandedNodes.add(node.id);
		} else if (!searchQuery) {
			// Optional: collapse when search is cleared
			expandedNodes.delete(node.id);
		}

		return {
			...node,
			depth,
			expanded: expandedNodes.has(node.id),
			children: filteredChildren || [],
			matches,
			opacity: matches ? 1 : 0.5
		};
	}

	// Update expanded nodes when search query changes
	$: {
		if (searchQuery) {
			applySearchFilter(data);
			expandedNodes = new Set(expandedNodes); // Trigger reactivity
		}
	}

	$: filteredTree = searchQuery ? applySearchFilter(data) : { ...data, depth: 0 };
</script>

<div class={cx('layerTree-wrapper', $$props.class)}>
	<div class="panel-section search-container">
		<Input
			icon="SearchSvg_32"
			class="search-input"
			bind:value={searchQuery}
			placeholder="Search layers..."
		/>
	</div>

	<div class="panel-section layerTree-container">
		<LayerTreeNode
			data={filteredTree}
			{expandedNodes}
			{singleSelect}
			{clickable}
			on:select
			on:toggle
		/>
	</div>
</div>

<style lang="scss">
	.layerTree-wrapper {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}

	.search-container {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px;
		width: 100%;
		// border-bottom: 1px solid var(--figma-color-border);
		background: var(--figma-color-bg);
		position: sticky;
		top: 0;
		z-index: 1;

		:global(.icon) {
			color: var(--figma-color-icon-secondary);
			width: 16px;
			height: 16px;
		}
	}

	.search-input {
		flex: 1;
		min-width: 0;
		background: transparent;
		border: none;
		font-size: 11px;
		width: 100%;
		&:focus {
			outline: none;
		}
	}

	.layerTree-container {
		flex: 1;
		overflow: auto;
		height: 100%;
	}
</style>
