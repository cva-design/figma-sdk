<script lang="ts">
	import { IconToggle } from '#ui';
	import { cva } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IconName } from '../icon/types';
	import type { ActionButton, ActionColor, ActionToggle, IAction } from './types';

	interface $$Props extends HTMLAttributes<HTMLButtonElement> {
		action: IAction;
		data: Record<string, any>;
	}

	export let action: $$Props['action'];

	const actionIcon = cva('', {
		variants: {
			kind: {
				toggle: '',
				button: '',
				color: ''
			},
			state: {
				active: '',
				inactive: '',
				disabled: ''
			}
		},
		compoundVariants: [
			{
				kind: 'toggle',
				state: 'active',
				class: (action as ActionToggle).icons.on
			},
			{
				kind: 'toggle',
				state: 'inactive',
				class: (action as ActionToggle).icons.off
			},
			{
				kind: 'toggle',
				state: 'disabled',
				class: (action as ActionToggle).icons.disabled || (action as ActionToggle).icons.off
			},
			{
				kind: 'button',
				state: ['active', 'inactive'],
				class: (action as ActionButton).icons.default
			},
			{
				kind: 'button',
				state: 'disabled',
				class: (action as ActionButton).icons.disabled || (action as ActionButton).icons.default
			},
			{
				kind: 'color',
				state: ['active', 'inactive'],
				class: (action as ActionColor).icons.default
			},
			{
				kind: 'color',
				state: 'disabled',
				class: (action as ActionColor).icons.disabled || (action as ActionColor).icons.default
			}
		],
		defaultVariants: {
			kind: 'button',
			state: 'inactive'
		}
	});

	function handleActionClick(event: MouseEvent) {
		event.stopPropagation();
		if (action?.click) {
			action.click({ action, event, data: $$props.data });
		}
	}

	$: iconKey = actionIcon({
		kind: action.kind,
		state: !action.enabled
			? 'disabled'
			: action.kind === 'toggle' && action.isActive
				? 'active'
				: 'inactive'
	}) as IconName;

	$: dataId = action.id;
</script>

<button
	class="action"
	class:active={action.kind === 'toggle' && action.isActive}
	disabled={!action.enabled}
	title={action.tooltip}
	on:click={handleActionClick}
	data-id={dataId}
	{...$$restProps}
>
	{#if action.kind === 'color' && action.colors}
		<div class="color-indicators">
			{#each action.colors as color}
				<div class="color-circle" style="background-color: {color}"></div>
			{/each}
		</div>
	{:else if action.kind === 'toggle'}
		<IconToggle states={action.icons} on={action.isActive} disabled={!action.enabled} />
	{:else}
		{console.error(`Unsupported action kind: ${action.kind}`, { action })}
	{/if}
</button>

<style lang="scss">
	.action {
		background: none;
		border: none;
		cursor: pointer;
		padding: 2px;
		margin: 0 2px;
		color: var(--figma-color-icon-secondary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.action:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.action.active {
		color: var(--figma-color-icon);
	}

	.action:hover:not(:disabled) {
		color: var(--figma-color-icon);
	}

	.color-indicators {
		display: flex;
		gap: 2px;
		align-items: center;
		padding: 2px;
	}

	.color-circle {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
</style>
