<script lang="ts">
	import { Text } from '#ui';
	import { Icon, type IconName } from '../icon';
	import type { AlertType } from './types';
	export let text: string;
	export let type: AlertType = 'hint';

	const iconMap: Record<AlertType, IconName> = {
		success: 'CheckCircleSvg_32',
		warning: 'WarningLargeSvg',
		danger: 'CrossbonesSvg',
		hint: 'InfoSvg_32'
	};

	$: alertClass = `alert-${type}`;
	$: currentIcon = iconMap[type];
</script>

<div class="alert {alertClass}">
	<Icon iconName={currentIcon} size="large" class="alert-icon" />
	<Text>{text}</Text>
</div>

<style>
	.alert {
		display: flex;
		align-items: center;
		padding: 0 1rem;
		height: 40px;
		width: 100%;
	}

	.alert-icon {
		width: 1.25rem;
		height: 1.25rem;
		margin-right: 0.5rem;
	}

	.alert-success {
		background-color: var(--figma-color-bg-success-tertiary);
		color: var(--figma-color-text-onsuccess);
	}

	.alert-warning {
		background-color: var(--figma-color-bg-warning-tertiary);
		color: var(--figma-color-text-onwarning);
	}

	.alert-danger {
		background-color: var(--figma-color-bg-danger);
		color: var(--figma-color-text-ondanger);
	}

	.alert-hint {
		background-color: var(--figma-color-bg-brand-tertiary);
		color: var(--figma-color-text-onbrand);
	}
</style>
