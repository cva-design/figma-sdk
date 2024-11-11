<script context="module" lang="ts">
	export type ToggleState = {
		icon: keyof typeof import('$icons');
		tooltip?: string;
	};

	export type ToggleStates = {
		on: ToggleState;
		off: ToggleState;
		disabled?:
			| Partial<ToggleState>
			| {
					on: ToggleState;
					off: ToggleState;
			  };
	};
</script>

<script lang="ts">
	import { Icon } from '$ui/icon';
	import { Tooltip } from '$ui/tooltip';
	import { cva } from 'class-variance-authority';
	import { createEventDispatcher } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const dispatch = createEventDispatcher<{
		change: { on: boolean };
	}>();

	interface $$Props extends HTMLAttributes<HTMLButtonElement> {
		states: ToggleStates;
		on?: boolean;
		disabled?: boolean;
	}

	export let states: $$Props['states'];
	export let on = false;
	export let disabled = false;

	const toggleVariants = cva('', {
		variants: {
			state: {
				on: '',
				off: '',
				disabledOn: '',
				disabledOff: ''
			}
		},
		defaultVariants: {
			state: 'off'
		}
	});

	$: normalizedDisabledStates = states.disabled
		? 'on' in states.disabled
			? states.disabled
			: {
					on: { icon: states.on.icon, ...states.disabled },
					off: { icon: states.off.icon, ...states.disabled }
				}
		: // no disabled state config provided...
			{
				on: { icon: states.on.icon },
				off: { icon: states.off.icon }
			};

	$: currentState = disabled
		? on
			? normalizedDisabledStates.on
			: normalizedDisabledStates.off
		: on
			? states.on
			: states.off;

	$: icon = currentState.icon;
	$: tooltip = currentState.tooltip;

	function handleClick() {
		if (!disabled) {
			on = !on;
			dispatch('change', { on });
		}
	}
</script>

{#if tooltip}
	<Tooltip content={tooltip}>
		<button
			class={toggleVariants({
				state: disabled ? (on ? 'disabledOn' : 'disabledOff') : on ? 'on' : 'off'
			})}
			{disabled}
			on:click={handleClick}
			{...$$restProps}
		>
			<Icon {icon} />
		</button>
	</Tooltip>
{:else}
	<button
		class={toggleVariants({
			state: disabled ? (on ? 'disabledOn' : 'disabledOff') : on ? 'on' : 'off'
		})}
		{disabled}
		on:click={handleClick}
		{...$$restProps}
	>
		<Icon {icon} />
	</button>
{/if}

<style>
	button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px;
		margin: 0 2px;
		color: var(--figma-color-icon-secondary);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	button:global(.on) {
		color: var(--figma-color-icon);
	}

	button:hover:not(:disabled) {
		color: var(--figma-color-icon);
	}
</style>
