<script context="module" lang="ts">
	export const disclosure = Symbol('disclosure');
</script>

<script lang="ts">
	import CaretDown from '$icons/ui2/caret-down.svg';
	import CaretRight from '$icons/ui2/caret-right.svg';
	import { getContext } from 'svelte';
	// import CaretDown from './../../icons/caret-down.svg';
	// import CaretRight from './../../icons/caret-right.svg';
	import Icon from './../Icon/index.svelte';

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
				<Icon iconUrl={CaretDown} color="black" />
			{:else}
				<Icon iconUrl={CaretRight} color="black" />
			{/if}
		</div>
		<div class="title">{title}</div>
	</div>
	<div class="content">
		<slot />
	</div>
</li>

<style>
	li {
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style-type: none;
		border-bottom: 1px solid var(--figma-color-border);
	}
	li:last-child {
		border-bottom: 1px solid transparent;
	}

	.header {
		display: flex;
		align-items: center;
		height: var(--spacer-5);
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		line-height: var(--line-height);
		color: var(--figma-color-text);
	}
	.header:hover .icon {
		opacity: 0.9;
	}

	.title {
		margin-left: -4px;
		user-select: none;
	}

	.icon {
		margin-left: -4px;
		opacity: 0.3;
	}
	.expanded .icon {
		opacity: 0.8;
	}

	.section {
		font-weight: var(--font-weight-strong);
	}

	.content {
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-pos-xsmall);
		line-height: var(--line-height);
		color: var(--figma-color-text);
		padding: var(--spacer-2) var(--spacer-2) var(--spacer-2) var(--spacer-4);
		display: none;
		user-select: none;
		pointer-events: none;
	}

	.expanded .content {
		display: block;
	}
</style>
