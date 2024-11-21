<script lang="ts">
	import './select-item.css';
	import type { HTMLAttributes } from 'svelte/elements';

	export let itemId: string | number;
	export let selected = false;
	export let class_name = '';

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
	<div class="icon" class:selected />
	<div class="label"><slot /></div>
</li>
