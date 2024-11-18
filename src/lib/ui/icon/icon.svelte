<script lang="ts">
	import * as icons from '$icons';
	import type { AutocompletableString } from '$lib/util';

	type IconProps = {
		color?: '--figma-color-icon' | AutocompletableString;
		spin?: boolean;
		class?: string;
	} & (
		| { icon: keyof typeof import('$icons'); iconText?: never }
		| { icon?: never; iconText: string }
	);

	/**
	 * icon: The icon identifier from the icons collection
	 */
	export let icon: IconProps['icon'] = undefined;

	/**
	 * A string that will be displayed as the icon.
	 * If provided, it is displayed instead of the icon.
	 * It is useful for using characters or emojis as icons.
	 */
	export let iconText: IconProps['iconText'] = undefined;

	/**
	 * color: The color of the icon. This should be a CSS color variable.
	 */
	export let color: IconProps['color'] = '--figma-color-icon';

	/**
	 * spin: Whether the icon should spin
	 */
	export let spin: IconProps['spin'] = false;

	/**
	 * className: Additional CSS classes that can be applied to the icon.
	 */
	let className = '';
	export { className as class };
</script>

{#if iconText}
	<div
		class="icon-component {className}"
		class:spin
		style="color: var({color}); fill: var({color})"
	>
		{iconText}
	</div>
{:else if icon}
	<div
		class="icon-component {className}"
		class:spin
		style="color: var({color}); fill: var({color})"
	>
		{@html icons[icon]}
	</div>
{/if}

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

	:global(.icon-component svg) {
		width: 100%;
		height: 100%;
	}
</style>
