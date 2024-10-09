<script lang="ts">
import Icon from './../Icon/index.svelte';

export const spin = false;
export const color = 'black8';
export const iconName: string | null = null;
export const iconText: string | null = null;
export { className as class };

const className = '';
</script>

<div class="onboarding-tip {className}">
    <div class="icon">
        <Icon {iconName} {iconText} {color} {spin}/>
    </div>
    <p>
        <slot></slot>
    </p>
</div>

<style>

    .onboarding-tip {
        display: flex;
        align-items: top;
        padding: 0 var(--size-xsmall) 0 0;
    }

    .icon {
        width: var(--size-medium);
        height: var(--size-medium);
        margin-right: var(--size-xxsmall);
    }

    p   {
        padding: var(--size-xxsmall) 0 var(--size-xxsmall) 0;
        font-size: var(--font-size-xsmall);
        font-weight: var(--font-weight-normal);
        letter-spacing: var( --font-letter-spacing-pos-xsmall);
        line-height: var(--line-height);
        color: var(--figma-color-text);
        margin: 0;
    }

</style>
