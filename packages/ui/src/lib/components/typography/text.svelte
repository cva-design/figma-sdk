<script lang="ts">
	import { type VariantProps, cva } from 'class-variance-authority';
	import type { HTMLAttributes } from 'svelte/elements';

	const text = cva('fps-Text', {
		variants: {
			size: {
				small: 'fps-text-small',
				medium: 'fps-text-medium',
				large: 'fps-text-large'
			},
			weight: {
				default: 'fps-weight-default',
				strong: 'fps-weight-strong'
			},
			align: {
				left: 'fps-align-start',
				center: 'fps-align-center',
				right: 'fps-align-end'
			},
			intent: {
				default: '',
				brand: 'fps-intent-brand',
				success: 'fps-intent-success',
				warning: 'fps-intent-warning',
				danger: 'fps-intent-danger',
				error: 'fps-intent-danger'
			},
			emphasis: {
				default: '',
				secondary: 'fps-emphasis-secondary',
				tertiary: 'fps-emphasis-tertiary'
			},
			surface: {
				default: '',
				brand: 'fps-surface-brand',
				component: 'fps-surface-component',
				selected: 'fps-surface-selected',
				inverse: 'fps-surface-inverse',
				menu: 'fps-surface-menu'
			},
			block: {
				true: 'fps-block'
			},
			inverse: {
				true: 'fps-inverse'
			},
			disabled: {
				true: 'fps-disabled'
			},
			muted: {
				true: 'fps-muted'
			},
			ellipsis: {
				true: 'fps-ellipsis'
			},
			nowrap: {
				true: 'fps-nowrap'
			}
		},
		defaultVariants: {
			size: 'medium',
			weight: 'default',
			align: 'left',
			intent: 'default',
			emphasis: 'default',
			surface: 'default',
			block: false,
			inverse: false,
			disabled: false,
			muted: false,
			ellipsis: false,
			nowrap: false
		}
	});

	interface $$Props extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof text> {
		/** Whether to disable pointer events on the text */
		pointerEvents?: 'none' | 'auto';
	}

	export let size: $$Props['size'] = 'medium';
	export let weight: $$Props['weight'] = 'default';
	export let align: $$Props['align'] = 'left';
	export let intent: $$Props['intent'] = 'default';
	export let emphasis: $$Props['emphasis'] = 'default';
	export let surface: $$Props['surface'] = 'default';
	export let block: $$Props['block'] = false;
	export let inverse: $$Props['inverse'] = false;
	export let disabled: $$Props['disabled'] = false;
	export let muted: $$Props['muted'] = false;
	export let ellipsis: $$Props['ellipsis'] = false;
	export let nowrap: $$Props['nowrap'] = false;
	/** Whether to disable pointer events on the text */
	export let pointerEvents: $$Props['pointerEvents'] = 'auto';
</script>

<span
	class={`${text({ size, weight, align, intent, emphasis, surface, block, inverse, disabled, muted, ellipsis, nowrap, class: $$props.class })}`}
	style:pointer-events={pointerEvents}
>
	<slot />
</span>

<style lang="scss">
	.fps-Text {
		margin: 0;
		font-family: var(--font-family-default);
		color: var(--figma-color-text);
		font-size: var(--font-size, var(--font-size-default));
		line-height: var(--line-height, var(--line-height-3));
		letter-spacing: var(--letter-spacing, var(--letter-spacing-3));
		font-weight: var(--font-weight, var(--font-weight-default));

		/**
  Use custom properties to avoid specificy issues when nesting Text.
  Nested Text components inherit properties of the parent Text, unless customized.
  At the same time, Text falls back to default values without requiring :root level styling. */
		&:where(.fps-text-small) {
			--font-size: var(--font-size-1);
			--line-height: var(--line-height-1);
			--letter-spacing: var(--letter-spacing-1);
		}

		&:where(.fps-text-medium) {
			--font-size: var(--font-size-3);
			--line-height: var(--line-height-3);
			--letter-spacing: --letter-spacing-3;
		}

		&:where(.fps-text-large) {
			--font-size: var(--font-size-5);
			--line-height: var(--line-height-5);
			--letter-spacing: var(--letter-spacing-5);
		}

		&:where(.fps-weight-default) {
			--font-weight: var(--font-weight-default);
		}

		&:where(.fps-weight-strong) {
			--font-weight: var(--font-weight-strong);
		}

		&:where(.fps-align-start) {
			text-align: left;
		}

		&:where(.fps-align-center) {
			text-align: center;
		}

		&:where(.fps-align-end) {
			text-align: right;
		}

		&:where(.fps-block) {
			display: block;
		}

		&:where(.fps-disabled) {
			color: var(--figma-color-text-disabled);
		}

		&:where(.fps-inverse) {
			color: var(--figma-color-text-oninverse);
		}

		&:where(.fps-muted) {
			color: var(--figma-color-text-tertiary);
		}

		&:where(.fps-ellipsis) {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			min-width: 0;
		}

		&:where(.fps-nowrap) {
			white-space: nowrap;
		}

		& strong {
			font-weight: var(--font-weight-strong);
		}

		& code {
			font-family: var(--font-family-monospace);
			font-size: var(--font-size-2);
			background-color: var(--figma-color-bg-brand-tertiary);
			padding: 0.05rem 0.15rem;
			border-radius: var(--radius-extra-small);
		}

		mark {
			background-color: var(--figma-color-bg-onselected);
		}

		&:where(.fps-intent-brand) {
			color: var(--figma-color-text-brand);
		}
		&:where(.fps-intent-success) {
			color: var(--figma-color-text-success);
		}
		&:where(.fps-intent-warning) {
			color: var(--figma-color-text-warning);
		}
		&:where(.fps-intent-danger) {
			color: var(--figma-color-text-danger);
		}

		&:where(.fps-emphasis-secondary) {
			color: var(--figma-color-text-secondary);
		}
		&:where(.fps-emphasis-tertiary) {
			color: var(--figma-color-text-tertiary);
		}

		&:where(.fps-surface-brand) {
			color: var(--figma-color-text-onbrand);
		}
		&:where(.fps-surface-component) {
			color: var(--figma-color-text-oncomponent);
		}
		&:where(.fps-surface-selected) {
			color: var(--figma-color-text-onselected);
		}
		&:where(.fps-surface-inverse) {
			color: var(--figma-color-text-oninverse);
		}
		&:where(.fps-surface-menu) {
			color: var(--color-icon-menu);
			fill: var(--color-text-menu);
		}

		&:where(.fps-color-brand) {
			color: var(--figma-color-text-brand);
		}
		&:where(.fps-color-brand-secondary) {
			color: var(--figma-color-text-brand-secondary);
		}
		&:where(.fps-color-brand-tertiary) {
			color: var(--figma-color-text-brand-tertiary);
		}
		&:where(.fps-color-component) {
			color: var(--figma-color-text-component);
		}
		&:where(.fps-color-component-pressed) {
			color: var(--figma-color-text-component-pressed);
		}
		&:where(.fps-color-component-secondary) {
			color: var(--figma-color-text-component-secondary);
		}
		&:where(.fps-color-component-tertiary) {
			color: var(--figma-color-text-component-tertiary);
		}
		&:where(.fps-color-danger) {
			color: var(--figma-color-text-danger);
		}
		&:where(.fps-color-danger-secondary) {
			color: var(--figma-color-text-danger-secondary);
		}
		&:where(.fps-color-danger-tertiary) {
			color: var(--figma-color-text-danger-tertiary);
		}
		&:where(.fps-color-disabled) {
			color: var(--figma-color-text-disabled);
		}
		&:where(.fps-color-hover) {
			color: var(--figma-color-text-hover);
		}
		&:where(.fps-color-onbrand) {
			color: var(--figma-color-text-onbrand);
		}
		&:where(.fps-color-onbrand-secondary) {
			color: var(--figma-color-text-onbrand-secondary);
		}
		&:where(.fps-color-onbrand-tertiary) {
			color: var(--figma-color-text-onbrand-tertiary);
		}
		&:where(.fps-color-oncomponent) {
			color: var(--figma-color-text-oncomponent);
		}
		&:where(.fps-color-oncomponent-secondary) {
			color: var(--figma-color-text-oncomponent-secondary);
		}
		&:where(.fps-color-oncomponent-tertiary) {
			color: var(--figma-color-text-oncomponent-tertiary);
		}
		&:where(.fps-color-ondanger) {
			color: var(--figma-color-text-ondanger);
		}
		&:where(.fps-color-ondanger-secondary) {
			color: var(--figma-color-text-ondanger-secondary);
		}
		&:where(.fps-color-ondanger-tertiary) {
			color: var(--figma-color-text-ondanger-tertiary);
		}
		&:where(.fps-color-ondisabled) {
			color: var(--figma-color-text-ondisabled);
		}
		&:where(.fps-color-oninverse) {
			color: var(--figma-color-text-oninverse);
		}
		&:where(.fps-color-onselected) {
			color: var(--figma-color-text-onselected);
		}
		&:where(.fps-color-onselected-secondary) {
			color: var(--figma-color-text-onselected-secondary);
		}
		&:where(.fps-color-onselected-strong) {
			color: var(--figma-color-text-onselected-strong);
		}
		&:where(.fps-color-onselected-tertiary) {
			color: var(--figma-color-text-onselected-tertiary);
		}
		&:where(.fps-color-onsuccess) {
			color: var(--figma-color-text-onsuccess);
		}
		&:where(.fps-color-onsuccess-secondary) {
			color: var(--figma-color-text-onsuccess-secondary);
		}
		&:where(.fps-color-onsuccess-tertiary) {
			color: var(--figma-color-text-onsuccess-tertiary);
		}
		&:where(.fps-color-onwarning) {
			color: var(--figma-color-text-onwarning);
		}
		&:where(.fps-color-onwarning-secondary) {
			color: var(--figma-color-text-onwarning-secondary);
		}
		&:where(.fps-color-onwarning-tertiary) {
			color: var(--figma-color-text-onwarning-tertiary);
		}
		&:where(.fps-color-secondary) {
			color: var(--figma-color-text-secondary);
		}
		&:where(.fps-color-secondary-hover) {
			color: var(--figma-color-text-secondary-hover);
		}
		&:where(.fps-color-selected) {
			color: var(--figma-color-text-selected);
		}
		&:where(.fps-color-selected-secondary) {
			color: var(--figma-color-text-selected-secondary);
		}
		&:where(.fps-color-selected-tertiary) {
			color: var(--figma-color-text-selected-tertiary);
		}
		&:where(.fps-color-success) {
			color: var(--figma-color-text-success);
		}
		&:where(.fps-color-success-secondary) {
			color: var(--figma-color-text-success-secondary);
		}
		&:where(.fps-color-success-tertiary) {
			color: var(--figma-color-text-success-tertiary);
		}
		&:where(.fps-color-tertiary) {
			color: var(--figma-color-text-tertiary);
		}
		&:where(.fps-color-tertiary-hover) {
			color: var(--figma-color-text-tertiary-hover);
		}
		&:where(.fps-color-warning) {
			color: var(--figma-color-text-warning);
		}
		&:where(.fps-color-warning-secondary) {
			color: var(--figma-color-text-warning-secondary);
		}
		&:where(.fps-color-warning-tertiary) {
			color: var(--figma-color-text-warning-tertiary);
		}
	}

	.fps-Link {
		color: var(--figma-color-text-brand);
		text-decoration: none;

		&:focus-visible {
			outline: 1px solid var(--figma-color-border-selected-strong);
		}
	}
</style>
