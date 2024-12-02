<script lang="ts" context="module">
export type LayerProps = {
	type: LayerType;
	name: string;
	component: boolean;
	selected: boolean;
	description?: string;
	actions: Array<{
		id: string;
		kind: 'toggle';
		icons: {
			on: string;
			off: string;
		};
		tooltip: string;
		active?: boolean;
		enabled?: boolean;
		click?: () => void;
	}>;
	click?: (event: Event) => void;
};
</script>

<script lang="ts">
	import { Text } from '../../../components/text';
	import { IconToggle } from '../../../components/icon-toggle';
	import type { ToggleState } from '../../../components/icon-toggle';
	import type { LayerType } from '../../layer/types';
	import { LayerIcon } from '../../layer/types';

	export let type: LayerType;
	export let name: string;
	export let description: string | undefined = undefined;
	export let component: boolean = false;
	export let selected: boolean = false;
	export let actions: LayerProps['actions'] = [];

	function createToggleState(icon: string): ToggleState {
		return { icon } as ToggleState;
	}

	$: iconUrl = LayerIcon[type];

	// Separate actions by type
	$: lockAction = actions.find(a => a.id === 'lock');
	$: visibilityAction = actions.find(a => a.id === 'visible');
</script>

<div class="layer" class:component class:selected>
	<span class="layer--icon">
		{@html iconUrl}
	</span>

	<Text class="layer--name" size="medium">{name}</Text>

	{#if description}
		<Text class="layer--description">{description}</Text>
	{/if}

	<div class="layer--actions">
		{#if visibilityAction}
			<IconToggle 
				states={{
					on: createToggleState(visibilityAction.icons.on),
					off: createToggleState(visibilityAction.icons.off)
				}}
				on={visibilityAction.active}
				title={visibilityAction.tooltip}
				on:click={visibilityAction.click}
				class="action-toggle visibility-toggle"
				data-id="visible"
			/>
		{/if}
	</div>

	{#if lockAction}
		<div class="lock-action">
			<IconToggle 
				states={{
					on: createToggleState(lockAction.icons.on),
					off: createToggleState(lockAction.icons.off)
				}}
				on={lockAction.active}
				title={lockAction.tooltip}
				on:click={lockAction.click}
				class="action-toggle"
				data-id="lock"
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.layer {
		display: flex;
		align-items: center;
		padding: 0 8px;
		height: 32px;
		width: 100%;
		position: relative;
	}

	.layer--icon {
		flex: 0 0 16px;
		height: 16px;
		margin-right: 8px;
		color: var(--figma-color-icon-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
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
		position: absolute;
		right: 32px;
		display: none;
		align-items: center;
	}

	.lock-action {
		position: absolute;
		right: 8px;
		display: flex;
		align-items: center;
	}

	.layer:hover .layer--actions {
		display: flex;
	}

	:global(.visibility-toggle) {
		color: var(--figma-color-icon-secondary);
	}

	:global(.visibility-toggle:hover) {
		color: var(--figma-color-icon);
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

	:global(.action-toggle) {
		color: var(--figma-color-icon-secondary);
	}

	:global(.action-toggle:hover) {
		color: var(--figma-color-icon);
	}

	:global(.action-toggle[data-id="visible"]) {
		margin-right: 0;
	}
</style>
