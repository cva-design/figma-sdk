<script lang="ts">
  import type { AlertType } from './types';
  import { getIconProps, Icon, type IconProps } from '../icon';

  export let text: string;
  export let type: AlertType = 'hint';
  export let iconName: string;

  const iconMap = {
    success: 'StarOnSvg',
    warning: 'WarningLargeSvg',
    error: 'WarningLargeSvg',
    hint: 'StarOnSvg'
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
    color: var(--figma-color-text-success);
  }

  .alert-warning {
    background-color: var(--figma-color-bg-warning-tertiary);
    color: var(--figma-color-text-warning);
  }

  .alert-error {
    background-color: var(--figma-color-bg-danger-tertiary);
    color: var(--figma-color-text-danger);
  }

  .alert-hint {
    background-color: var(--figma-color-bg-brand-tertiary);
    color: var(--figma-color-text-brand);
  }

</style> 