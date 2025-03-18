<script lang="ts">
	import type { VariantProps } from 'class-variance-authority';
	import { cva } from 'class-variance-authority';
	import { Icon, type IconName } from '../icon';
	import type { AlertPosition, AlertType } from './types';

	interface $$Props extends VariantProps<typeof alert> {
		type?: AlertType;
		position?: AlertPosition;
	}

	export let type: $$Props['type'] = undefined;
	export let position: $$Props['position'] = undefined;

	const iconMap: Record<AlertType, IconName> = {
		success: 'CheckCircleSvg_32',
		warning: 'WarningLargeSvg',
		danger: 'CrossbonesSvg',
		hint: 'InfoSvg_32',
		info: 'InfoSvg_32'
	};

	/**
	 * Alert component variants using class-variance-authority
	 */
	export const alert = cva('fps-alert', {
		variants: {
			type: {
				success: 'fps-alert-success',
				warning: 'fps-alert-warning',
				danger: 'fps-alert-danger',
				hint: 'fps-alert-hint',
				info: 'fps-alert-info'
			},
			position: {
				toast: 'fps-alert-toast',
				block: 'fps-alert-block'
			}
		},
		defaultVariants: {
			type: 'hint',
			position: 'toast'
		}
	});

	/**
	 * Alert icon variants using class-variance-authority
	 */
	export const alertIcon = cva('fps-alert-icon', {
		variants: {
			type: {
				success: 'alert-icon-success',
				warning: 'alert-icon-warning',
				danger: 'alert-icon-danger',
				hint: 'alert-icon-hint',
				info: 'alert-icon-hint'
			}
		},
		defaultVariants: {
			type: 'hint'
		}
	});

	$: currentIcon = iconMap[type ?? 'hint'];
</script>

<div class={alert({ type, position, class: $$props.class })}>
	<div class="fps-alert-icon-row">
		<Icon iconName={currentIcon} size="medium" class={alertIcon({ type })} />
	</div>
	<div class="fps-alert-content">
		<slot />
	</div>
</div>

<style lang="scss">
	.fps-alert {
		display: flex;
		align-items: start;
	}

	.fps-alert:where(.fps-alert-toast) {
		flex-direction: column;
		padding: 0 1rem;
		height: 40px;
		width: 100%;
	}

	.fps-alert:where(.fps-alert-block) {
		flex-direction: column;
		border-radius: var(--radius-medium);
    padding: var(--spacer-1);
	}
  
  .fps-alert-content {
    padding: var(--spacer-1) var(--spacer-2) var(--spacer-2);
  }
  
	.fps-alert :global(.fps-alert-icon) {
		color: var(--figma-color-icon);
	}

	.fps-alert:where(.fps-alert-success) {
		background-color: var(--figma-color-bg-success-tertiary);
		color: var(--figma-color-text-onsuccess);
	}

	.fps-alert:where(.fps-alert-warning) {
		background-color: var(--figma-color-bg-warning-tertiary);
		color: var(--figma-color-text-onwarning);
	}

	.fps-alert:where(.fps-alert-danger) {
		background-color: var(--figma-color-bg-danger);
		color: var(--figma-color-text-ondanger);
	}

	.fps-alert:where(.fps-alert-hint) {
		background-color: var(--figma-color-bg-brand-tertiary);
		color: var(--figma-color-text-onbrand);
	}

	.fps-alert:where(.fps-alert-info) {
		background-color: var(--figma-color-bg-secondary);
		color: var(--figma-color-text);
	}
</style>
