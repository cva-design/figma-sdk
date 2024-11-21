<script lang="ts">
	import './icon-button.css';
	import { Tooltip } from '$ui/tooltip';
	import { cva, type VariantProps } from 'class-variance-authority';

	const iconButton = cva('fp-IconButton', {
		variants: {
			size: {
				small: 'fp-size-small',
				medium: 'fp-size-medium'
			},
			activeAppearance: {
				subtle: 'fp-active-appearance-subtle',
				solid: 'fp-active-appearance-solid'
			}
		},
		defaultVariants: {
			size: 'small',
			activeAppearance: 'subtle'
		}
	});

	interface $$Props extends VariantProps<typeof iconButton> {
		'aria-label': string;
		tooltipContent?: string;
		disableTooltip?: boolean;
		class?: string;
	}

	export let size: $$Props['size'] = undefined;
	export let activeAppearance: $$Props['activeAppearance'] = undefined;
	export let tooltipContent: string | undefined = undefined;
	export let disableTooltip = false;
	export { className as class };

	let className = '';
</script>

<svelte:element
	this="button"
	class={iconButton({ size, activeAppearance, class: className })}
	aria-label={$$props['aria-label']}
	on:click
	on:keydown
	{...$$restProps}
>
	{#if disableTooltip}
		<slot />
	{:else}
		<Tooltip content={tooltipContent ?? $$props['aria-label']}>
			<slot />
		</Tooltip>
	{/if}
</svelte:element>
