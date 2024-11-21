<script context="module" lang="ts">
	export const disclosure = Symbol('disclosure');
</script>

<script lang="ts">
	import './disclosure-item.css';
	import { CaretDownSvg, CaretRightSvg } from '$icons';
	import { getContext } from 'svelte';
	import { Icon } from '../icon';

	export let uniqueId = 'disclosureItem--' + (Math.random() * 10000000).toFixed(0).toString();
	export let title: string | null = null;
	export let expanded = false;
	export let section = false;
	export let open = false;

	interface DisclosureContext {
		clickHandler: (id: string) => void;
		selected: import('svelte/store').Writable<string>;
	}

	const { clickHandler, selected } = getContext<DisclosureContext>(disclosure);

	$: expanded = $selected === uniqueId;

	if (open) {
		selected.set(uniqueId);
	}
</script>

<li id={uniqueId} class:expanded class:open class:section>
	<div
		role="button"
		tabindex="0"
		on:click={() => clickHandler(uniqueId)}
		on:keypress
		class="header"
	>
		<div class="icon">
			{#if expanded}
				<Icon iconUrl={CaretDownSvg} color="black" />
			{:else}
				<Icon iconUrl={CaretRightSvg} color="black" />
			{/if}
		</div>
		<div class="title">{title}</div>
	</div>
	<div class="content">
		<slot />
	</div>
</li>
