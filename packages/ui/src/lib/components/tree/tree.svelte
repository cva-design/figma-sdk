<script lang="ts">
import { createEventDispatcher } from "svelte";
import TreeNode from "./tree-node.svelte";
import type { ITreeNode, TreeOptions } from "./types";

export const nodes: ITreeNode[] = [];
export const options: TreeOptions = {
	indentationWidth: 20,
	showLayerIcon: true,
	defaultActions: [],
};

const dispatch = createEventDispatcher();

function handleNodeAction(event: CustomEvent) {
	dispatch("nodeAction", event.detail);
}
</script>

<div class="tree">
	{#each nodes as node (node.id)}
		<TreeNode {node} {options} on:nodeAction={handleNodeAction} />
	{/each}
</div>

<style lang="scss">
.tree {
		font-family: Arial, sans-serif;
	}</style>
