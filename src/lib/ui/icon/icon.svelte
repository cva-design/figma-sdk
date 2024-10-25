<script lang="ts">
	/**
	 * iconName: SVG data string that gets inserted into the icon component.
	 * If you have an SVG you'd like to use, import it in the parent component
	 * and pass the data into this prop.
	 */
	export let iconUrl: string | null = null;

	/**
	 * spin: A boolean that, when true, applies a spinning animation to the icon.
	 */
	export let spin: boolean = false;

	/**
	 * iconText: A string that will be displayed as the icon's text.
	 * If this prop is provided, it will be used instead of the iconName prop.
	 */
	export let iconText: string | null = null;

	/**
	 * color: The color of the icon. This should be a CSS color variable.
	 */
	export let color: '--figma-color-icon' | AutocompletableString = '--figma-color-icon';

	/**
	 * className: Additional CSS classes that can be applied to the icon.
	 */
	let className = '';
	export { className as class };
	import type { AutocompletableString } from '$lib/util';
</script>

<!-- @component

  This component renders an icon, which can either be represented by SVG data (iconName) 
  or text (iconText). If both are provided, the text will be used. The icon's color 
  is controlled by the 'color' prop, and additional CSS classes can be applied using 
  the 'className' prop. If the 'spin' prop is true, a spinning animation will be applied to the icon.
-->
<div class="icon-component {className}" style="color: var({color}); fill: var({color})">
	{#if iconText}
		{iconText}
	{:else}
		{@html iconUrl}
		<!-- <img src={iconUrl} style="color: var({color}); fill: var({color})" class:spin alt="Component" /> -->
	{/if}
</div>

<style>
	.icon-component {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
		width: var(--spacer-5);
		height: var(--spacer-5);
		font-family: var(--font-family-default);
		font-size: var(--text-body-medium-font-size);
		user-select: none;
	}

	.spin {
		animation: rotating 1s linear infinite;
	}

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	:global(.icon-component *) {
		fill: inherit;
		color: inherit;
	}
</style>
