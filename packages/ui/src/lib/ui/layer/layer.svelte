<script lang="ts">
	import { ChevronDownSvg_16, ChevronRightSvg_16 } from '$icons';
	import { cva, type VariantProps } from 'class-variance-authority';
	import type { ComponentType } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import Text from '../text/text.svelte';
	import styles from './layer.module.css';
	import { LayerIcon, type LayerType } from './types';
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
			}
		}
	});

	interface LayerProps extends VariantProps<typeof layer> {
		description?: string;
		icon: ComponentType | string;
		value: boolean;
		propagateEscapeKeyDown?: boolean;
	}

	export let type: LayerType;
	/**
	 * TODO: automatically set bold to true
	 * if the layer is a FRAME or SECTION at the top-level
	 */
	export let bold: boolean | undefined = false;
	export let name: string;
	export let component: boolean | undefined = false;
	export let description: string | undefined = undefined;
	export let icon: string | undefined = undefined;
	export let selected: boolean | undefined = false;
	export let propagateEscapeKeyDown = true;
	export let expanded: boolean = false;

	const dispatch = createEventDispatcher();

	function handleChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const newValue = target.checked;
		expanded = newValue; // Toggle expanded state
		dispatch('change', event);
		dispatch('valueChange', newValue);
	}

	function handleKeyDown(event: KeyboardEvent) {
		dispatch('keydown', event);
		if (event.key === 'Escape') {
			if (!propagateEscapeKeyDown) {
				event.stopPropagation();
			}
			(event.currentTarget as HTMLInputElement).blur();
		}
	}

	const iconUrl = LayerIcon[type] ?? icon;
</script>

<div class={layer({ bold, component, expanded, selected })}>
	<div class={styles.layerContent}>
		<span class="layer-indent">
			{@html expanded ? ChevronDownSvg_16 : ChevronRightSvg_16}
		</span>
		<input
			{...$$restProps}
			bind:checked={selected}
			class={styles.input}
			on:change={handleChange}
			on:keydown={handleKeyDown}
			tabindex="0"
			type="checkbox"
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
	{#if $$slots.default}
		<div class={styles.children}>
			<slot />
		</div>
	{/if}
</div>


