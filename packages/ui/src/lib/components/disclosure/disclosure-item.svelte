<script context="module" lang="ts">
	export const disclosure = Symbol('disclosure');
</script>

<script lang="ts">
	import { getContext } from 'svelte';
	import { Icon } from '../icon';

	export let uniqueId = 'disclosureItem--' + (Math.random() * 10000000).toFixed(0).toString();
	export let title: string | null = null;
	export let expanded: boolean = false;
	export let section: boolean = false;
	export let open: boolean = false;

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
			<Icon iconName="CaretDownSvg" />
		</div>
		<div class="title">{title}</div>
	</div>
	<div class="content">
		<slot />
	</div>
</li>

<style lang="scss">
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
		transition: transform 0.1s;
	}
	.expanded .icon {
		opacity: 0.8;
		transform: rotate(-90deg);
		transition: transform 0.1s;
	}

	.figma-dark {
		.icon {
			color: #f00;
			fill: #f00;
			opacity: 0.3;
		}
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
