<script lang="ts" context="module">
	export type LayerProps = {
		type: LayerType;
		name: string;
		component: boolean;
		selected: boolean;
		description?: string;
		actions: Array<{
			id: string;
			icon: string;
			tooltip: string;
			active?: boolean;
			enabled?: boolean;
		}>;
		click?: (event: Event) => void;
	};
</script>

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

	import Action from './action.svelte';

	$: iconUrl = LayerIcon[type];
	const props = $$props as unknown as LayerProps;
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
				<Action {action} layer={props} on:click />
			{/each}
		</span>
	{/if}
</div>
