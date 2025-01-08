<script lang="ts" context="module">
	import type { Action as ActionType } from '../layer-tree/action.svelte';
	import type { LayerType } from './types';
	const layer = cva(styles.layer, {
		variants: {
			bold: {
				true: styles.bold
			},
			component: {
				true: styles.component
			},
			expanded: {
				true: styles.expanded
			},
			selected: {
				true: styles.selected
			},
			disabled: {
				true: styles.disabled
			}
		}
	});
	export interface LayerProps extends VariantProps<typeof layer> {
		description?: string;
		icons: ComponentType | string;
		value: boolean;
		propagateEscapeKeyDown?: boolean;
		onClick?: (event: MouseEvent) => void;
		actions?: Array<ActionType>;
		disabled: boolean;
	}
</script>

<script lang="ts">
	import { Icon, LayerIcon, Text } from '#ui';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ComponentType } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Action from '../layer-tree/action.svelte';
	import styles from './layer.module.css';

	interface LayerProps extends VariantProps<typeof layer> {
		description?: string;
		icons: ComponentType | string;
		value: boolean;
		propagateEscapeKeyDown?: boolean;
		onClick?: (event: MouseEvent) => void;
		actions?: Array<ActionType>;
		disabled: boolean;
	}

	export let type: LayerType;
	/**
	 * TODO: automatically set bold to true
	 * if the layer is a FRAME or SECTION at the top-level
	 */
	export const bold: boolean | undefined = false;
	export let name: string;
	export const component: boolean | undefined = false;
	export const description: string | undefined = undefined;
	export const icon: string | undefined = undefined;
	export let selected: boolean | undefined = false;
	export const propagateEscapeKeyDown: boolean = true;
	export let expanded: boolean = false;
	export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
	export let actions: LayerProps['actions'] = [];
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		if ($$slots.default) {
			const target = event.target as HTMLInputElement;
			const newValue = target.checked;
			expanded = newValue; // Toggle expanded state
			dispatch('change', event);
			dispatch('valueChange', newValue);
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		dispatch('keydown', event);

		if (event.key === 'Escape') {
			if (!propagateEscapeKeyDown) {
				event.stopPropagation();
			}
			(event.currentTarget as HTMLInputElement).blur();
		} else if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleLayerClick(event as unknown as MouseEvent);
		}
	}

	function handleLayerClick(event: MouseEvent) {
		if (disabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}
		// Only handle layer clicks if the click didn't originate from an action
		const target = event.target as HTMLElement;
		console.log('target', target);
		if (!target.closest('.actions')) {
			if (onClick) {
				onClick(event);
			}
			dispatch('click', event);
		}
	}
	const allProps: LayerProps = {
		...$$props,
		...$$restProps,
		disabled: disabled ?? false
	} as LayerProps;
	const iconUrl = LayerIcon[type] ?? icon;
</script>

<div
	class={layer({ bold, component, expanded, selected })}
	on:click={handleLayerClick}
	on:keydown={handleKeyDown}
	role="button"
	tabindex="0"
>
	<div
		class={`layer-content ${styles.layerContent} ${selected ? styles.layerIndentSelected : styles.layerIndent}`}
	>
		{#if $$slots.default}
			<span class="layer-chevron">
				<Icon icon={expanded ? 'ChevronDownSvg_16' : 'ChevronRightSvg_16'} />
			</span>
		{/if}
		<input
			{...$$restProps}
			bind:checked={selected}
			class={styles.input}
			on:change={handleChange}
			on:keydown={handleKeyDown}
			tabindex="0"
			type="checkbox"
			{disabled}
		/>
		<div class={styles.box} />
		<div class={styles.icon}>
			{@html iconUrl}
		</div>
		<Text size="medium" class={styles.name}>{name}</Text>
		{#if description}
			<Text class={styles.description}>{description}</Text>
		{/if}
	</div>
	<!-- If the actions stay inside the div, there is no way to click on it because it always clicks on the input again -->
	{#if actions && actions.length > 0}
		{#each actions as action}
			<Action {action} layer={allProps} />
		{/each}
	{/if}
	{#if $$slots.default}
		<div class={styles.children}>
			<slot />
		</div>
	{/if}
</div>

<style lang="scss">
	// .layer {
	// 	position: relative;
	// 	z-index: var(--z-index-1);
	// 	display: flex;
	// 	height: 32px;
	// 	align-items: center;
	// 	padding: 0 var(--space-small);
	// }

	// .input,
	// .box {
	// 	position: absolute;
	// 	top: 0;
	// 	right: 0;
	// 	bottom: 0;
	// 	left: 0;
	// }

	// .input {
	// 	z-index: var(--z-index-1);
	// 	display: block;
	// }
	// :global(.disabled) .input {
	// 	cursor: not-allowed;
	// }

	// .input:checked ~ .box {
	// 	background-color: var(--figma-color-bg-selected);
	// }
	// .input:not(:checked):hover ~ .box,
	// .input:focus ~ .box {
	// 	border: 1px solid var(--figma-color-border-brand-strong);
	// }

	// :global(.component) .input:checked ~ .box {
	// 	background-color: var(--figma-color-bg-component-tertiary);
	// }
	// :global(.component) .input:not(:checked):hover ~ .box,
	// :global(.component) .input:focus ~ .box {
	// 	border-color: var(--figma-color-border-component-strong);
	// }

	// .icon,
	// .children,
	// .description {
	// 	position: relative;
	// }

	// .children,
	// .description {
	// 	overflow: hidden;
	// 	text-overflow: ellipsis;
	// 	white-space: nowrap;
	// }

	// .children {
	// 	padding-left: var(--space-extra-small);
	// 	color: var(--figma-color-text);
	// }
	// :global(.component) .children {
	// 	color: var(--figma-color-text-component);
	// }
	// :global(.bold) .children {
	// 	font-weight: var(--font-weight-bold);
	// }

	// .icon {
	// 	height: 16px;
	// 	flex: 0 0 16px;
	// 	color: var(--figma-color-icon-secondary);
	// }
	// .input:checked ~ .icon {
	// 	color: var(--figma-color-icon);
	// }
	// :global(.component) .icon,
	// :global(.component) .input:checked ~ .icon {
	// 	color: var(--figma-color-icon-component);
	// }

	// .layer-indent {
	// 	display: flex;
	// 	align-items: center;
	// 	padding-left: var(--space-small);
	// }

	// .layer-indent-selected {
	// 	padding-left: var(--space-medium);
	// }

	:global(.actions) {
		display: none;
		position: relative;
		margin-left: auto;
		gap: var(--space-extra-small);
	}

	:global(.layer:hover .actions) {
		display: flex;
	}

	:global(.actionButton) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		padding: 0;
		border: none;
		background: none;
		color: var(--figma-color-icon-secondary);
		cursor: pointer;
		border-radius: var(--border-radius-small);
	}

	:global(.actionButton:hover) {
		background-color: var(--figma-color-bg-hover);
		color: var(--figma-color-icon);
	}
</style>
