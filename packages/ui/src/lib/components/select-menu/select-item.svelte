<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export let itemId: string | number;
	export const selected: boolean = false;
	export const class_name: string = '';

	interface $$Props extends HTMLAttributes<HTMLLIElement> {
		itemId: string | number;
		selected?: boolean;
		class?: string;
	}

	$: className = class_name || $$props.class || '';
</script>

<li
	role="option"
	itemid={String(itemId)}
	tabindex={Number(itemId) + 1}
	aria-selected={selected}
	class:highlight={selected}
	class={className}
	on:mouseenter
	on:click
	on:keydown
>
	<!-- todo: add icon correctly -->
	<!-- <div class="icon" class:selected /> -->
	<div class="label"><slot /></div>
</li>

<style lang="scss">
	li {
		align-items: center;
		color: var(--color-text);
		cursor: default;
		display: flex;
		font-family: var(--font-family-default);
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		line-height: var(--font-line-height);
		height: var(--spacer-4);
		padding: 0px var(--spacer-3) 0px var(--spacer-2);
		user-select: none;
		outline: none;
		transition-property: background-color;
		transition-duration: 30ms;
		text-wrap: nowrap;
		white-space: nowrap;
		background-color: var(--color-bg);
	}

	.label {
		white-space: nowrap;
		pointer-events: none;
	}

	.highlight,
	li:hover,
	li:focus {
		background-color: var(--figma-color-bg-brand);
		border-radius: var(--radius-medium);
	}

	.icon {
		width: var(--spacer-3);
		height: var(--spacer-3);
		margin-right: var(--spacer-2);
		opacity: 0;
		pointer-events: none;
		background-image: url('data:image/svg+xml;utf8,%3Csvg%20fill%3D%22none%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20width%3D%2216%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20clip-rule%3D%22evenodd%22%20d%3D%22m13.2069%205.20724-5.50002%205.49996-.70711.7072-.70711-.7072-3-2.99996%201.41422-1.41421%202.29289%202.29289%204.79293-4.79289z%22%20fill%3D%22%23fff%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E');
		background-repeat: no-repeat;
		background-position: center center;
	}
	.icon.selected {
		opacity: 1;
	}

	.blink,
	.blink:hover {
		background-color: transparent;
	}
</style>
