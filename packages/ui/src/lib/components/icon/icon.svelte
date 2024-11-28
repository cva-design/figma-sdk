<script lang="ts">
	import * as icons from '$icons';
	import type { IconProps } from './types';

	type $$Props = IconProps;

	const icon = $$props.icon;
	const iconText = $$props.iconText;
	const color = $$props.color ?? '--figma-color-icon';
	const spin = $$props.spin ?? false;

	$: if (icon && iconText) {
		throw new Error('Cannot set both icon and iconText at the same time');
	}
</script>

{#if iconText}
	<div
		class="icon-component {$$props.class}"
		class:spin
		style="color: var({color}); fill: var({color})"
	>
		{iconText}
	</div>
{:else if icon}
	<div
		class="icon-component {$$props.class}"
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
