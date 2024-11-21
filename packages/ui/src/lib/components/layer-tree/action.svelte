<script context="module" lang="ts">
	export type ActionKind = 'toggle' | 'button';

	type ActionBase<RequiredIcons extends string, OptionalIcons extends string> = {
		id: string;
		kind: ActionKind;
		tooltip: string;
		enabled?: boolean;
		click?: (params: { action: Action; event: Event; layer: LayerProps }) => void;
		icons: Record<RequiredIcons, keyof typeof import('$icons')> & {
			[K in OptionalIcons]?: keyof typeof import('$icons');
		};
	};

	export type ActionToggle = ActionBase<'on' | 'off', 'disabled'> & {
		kind: 'toggle';
		isActive?: boolean;
	};

	export type ActionButton = ActionBase<'default', 'disabled'> & {
		kind: 'button';
	};

	export type Action = ActionToggle | ActionButton;
</script>

<script lang="ts">
	import './action.css';
	import { Icon } from '$ui/icon';
	import { cva } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { LayerProps } from './layer.svelte';

	interface $$Props extends HTMLAttributes<HTMLButtonElement> {
		action: Action;
		layer: LayerProps;
	}

	export let action: $$Props['action'];
	export let layer: LayerProps;

	const actionIcon = cva('', {
		variants: {
			kind: {
				toggle: '',
				button: ''
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
			}
		],
		defaultVariants: {
			kind: 'button',
			state: 'inactive'
		}
	});

	function handleClick(event: Event) {
		if (action.enabled) {
			if (action.kind === 'toggle') {
				action.isActive = !action.isActive;
			}

			if (action.click) {
				action.click({ action, event, layer });
			}
		}
	}

	$: iconKey = actionIcon({
		kind: action.kind,
		state: !action.enabled
			? 'disabled'
			: action.kind === 'toggle' && action.isActive
				? 'active'
				: 'inactive'
	}) as keyof typeof import('$icons');
</script>

<button
	class="action"
	class:active={action.kind === 'toggle' && action.isActive}
	disabled={!action.enabled}
	title={action.tooltip}
	on:click={handleClick}
	{...$$restProps}
>
	<Icon icon={iconKey} />
</button>
