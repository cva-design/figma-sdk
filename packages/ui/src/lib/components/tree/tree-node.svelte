<script lang="ts">
import { ChevronDownSvg_16, ChevronRightSvg_16 } from "#icons";
import { createEventDispatcher } from "svelte";
import type { Action, ITreeNode, TreeOptions } from "./types";

export let node: ITreeNode;
export let options: TreeOptions;
export const depth: number = 0;

const dispatch = createEventDispatcher();

$: actions = [...(options.defaultActions || []), ...(node.actions || [])];
$: isExpanded = node.state?.expanded ?? false;

function toggleExpand() {
	node.state = { ...node.state, expanded: !isExpanded };
}

function handleAction(action: Action, event: Event) {
	dispatch("nodeAction", { node, action, event });
}

options.expandIcon = options.expandIcon ?? ChevronRightSvg_16;
options.collapseIcon = options.collapseIcon ?? ChevronDownSvg_16;
</script>

<div class="tree-node" style="padding-left: {depth * options.indentationWidth}px;">
	<div class="node-content">
		{#if node.children && node.children.length > 0}
			<button class="expand-icon" on:click={toggleExpand}>
				{@html isExpanded ? options.collapseIcon : options.expandIcon}
			</button>
		{/if}
		{#if options.showLayerIcon && node.icon}
			<span class="node-icon">{node.icon}</span>
		{/if}
		<span class="node-title">{node.title}</span>
		<div class="node-actions">
			{#each actions as action (action.id)}
				<button
					class="action-button"
					class:active={action.active}
					disabled={!action.enabled}
					on:click={(e) => handleAction(action, e)}
					on:dblclick={(e) => handleAction(action, e)}
					on:mouseenter={(e) => handleAction(action, e)}
					on:mouseleave={(e) => handleAction(action, e)}
					on:focus={(e) => handleAction(action, e)}
					on:blur={(e) => handleAction(action, e)}
					title={action.tooltip}
				>
					{action.icon}
				</button>
			{/each}
		</div>
	</div>
	{#if isExpanded && node.children && node.children.length > 0}
		<div class="node-children">
			{#each node.children as childNode (childNode.id)}
				<svelte:self node={childNode} {options} depth={depth + 1} on:nodeAction />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
.tree-node {
  margin: 2px 0;
}
.node-content {
  display: flex;
  align-items: center;
}
.expand-icon {
  cursor: pointer;
  margin-right: 5px;
}
.node-icon {
  margin-right: 5px;
}
.node-title {
  flex-grow: 1;
}
.node-actions {
  display: flex;
}
.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  margin: 0 2px;
}
.action-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.action-button.active {
  background-color: #e0e0e0;
}</style>
