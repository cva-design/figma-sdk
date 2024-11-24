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

<style lang="scss">
	.fk-icon {
		display: block;
		flex-shrink: 0;
		pointer-events: none;

		&:where(.fps-size-1) {
			width: var(--space-1);
		}

		&:where(.fps-size-2) {
			width: var(--space-2);
		}

		&:where(.fps-size-2_5) {
			width: var(--space-2_5);
		}

		&:where(.fps-size-3) {
			width: var(--space-3);
		}

		&:where(.fps-size-3_5) {
			width: var(--space-3_5);
		}

		&:where(.fps-size-4) {
			width: var(--space-4);
		}

		&:where(.fps-size-5) {
			width: var(--space-5);
		}

		&:where(.fps-size-6) {
			width: var(--space-6);
		}

		&:where(.fps-size-7) {
			width: var(--space-7);
		}

		&:where(.fps-size-8) {
			width: var(--space-8);
		}

		&:where(.fps-size-9) {
			width: var(--space-9);
		}

		&:where(.fps-size-10) {
			width: var(--space-10);
		}
	}

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
