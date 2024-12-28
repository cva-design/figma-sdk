<script lang="ts">
	import { type VariantProps, cva } from 'class-variance-authority';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Writable } from 'svelte/store';

	const tabsTrigger = cva('fps-TabsTrigger', {
		variants: {
			expand: {
				true: 'fps-expand'
			},
			disabled: {
				true: 'fps-disabled'
			}
		},
		defaultVariants: {
			expand: false,
			disabled: false
		}
	});

	interface $$Props extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof tabsTrigger> {
		value: string;
	}

	export let value: string;
	export let expand: $$Props['expand'] = false;
	export let disabled: $$Props['disabled'] = false;
	const className: string | undefined = undefined;
	export { className as class };

	const { register } = getContext('tabs') as {
		register: (value: string) => { isSelected: Writable<boolean>; select: () => void };
	};
	const { isSelected, select } = register(value);

	let triggerElement: HTMLButtonElement;

	$: isActive = $isSelected;

	function handleClick() {
		if (!disabled) {
			select();
		}
	}
</script>

<button
	bind:this={triggerElement}
	class={tabsTrigger({ expand, disabled, class: className })}
	role="tab"
	aria-selected={isActive}
	data-state={isActive ? 'active' : 'inactive'}
	{disabled}
	on:click={handleClick}
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

		&:where(.fps-expand) {
			width: 100%;
		}

		&:where(.fps-disabled) {
			cursor: default;
			opacity: 0.5;
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
