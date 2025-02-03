<script lang="ts">
  import type { AlertType } from './types';
  import { getIconProps, Icon, type IconProps, type IconName } from '../icon';

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
  <Icon iconName={currentIcon} size="large" class="alert-icon" color="currentColor" />
  <span>{text}</span>
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
    color: inherit;
  }

  .alert-success {
    background-color: var(--figma-color-bg-success-tertiary);
    color: var(--figma-color-text-on-success);
  }

  .alert-warning {
    background-color: var(--figma-color-bg-warning-tertiary);
    color: var(--figma-color-text-on-warning);
  }

  .alert-danger {
    background-color: var(--figma-color-bg-danger);
    color: var(--figma-color-text-ondanger);
  }

  .alert-hint {
    background-color: var(--figma-color-bg-brand-tertiary);
    color: var(--figma-color-text-on-brand);
  }

</style> 