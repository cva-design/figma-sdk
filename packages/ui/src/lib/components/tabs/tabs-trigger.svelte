<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let value: string;
	const className: string | undefined = undefined;
	export { className as class };
	export const expand: boolean = false;

	const { register } = getContext('tabs') as {
		register: (value: string) => { isSelected: Writable<boolean>; select: () => void };
	};
	const { isSelected, select } = register(value);

	let triggerElement: HTMLButtonElement;

	$: isActive = $isSelected;

	onMount(() => {
		if (triggerElement && !expand) {
			triggerElement.style.width = `${triggerElement.getBoundingClientRect().width}px`;
		}
	});
</script>

<button
	bind:this={triggerElement}
	class="fps-TabsTrigger {expand ? 'expand' : ''} {className || ''}"
	role="tab"
	aria-selected={isActive}
	data-state={isActive ? 'active' : 'inactive'}
	on:click={select}
>
	<slot />
</button>

<style lang="scss">
	.fps-TabsTrigger {
		all: unset;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		height: var(--space-6);
		padding: 0 var(--space-2);
		font-family: var(--font-family-default);
		font-size: var(--font-size-default);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--letter-spacing-default);
		line-height: var(--line-height-default);
		white-space: nowrap;
		cursor: pointer;

		&.expand {
			width: 100%;
		}

		&[data-state='inactive'] {
			color: var(--figma-color-text-secondary);
			--color-icon: var(--figma-color-icon-secondary);
		}

		&[data-state='active'] {
			font-weight: var(--font-weight-strong);
			color: var(--figma-color-text);
			--color-icon: var(--figma-color-icon);
			background: var(--figma-color-bg-secondary);
			border-radius: var(--radius-medium);
		}
	}
</style>
