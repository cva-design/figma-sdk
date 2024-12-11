<script lang="ts">
  import { type VariantProps, cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";
	import { Icon } from '$ui';

  export let size: 'one' | 'two' | 'three' = 'one';
  export let text = '';
  export let disabled = false;
</script>

<div class="header--layerNameRow header--layerRowContainer">
  <button 
    type="button" 
    class="header--copyableLayerName"
    class:header--layerName--levelOne={size === 'one'}
    class:header--layerName--levelTwo={size === 'two'}
    class:header--layerName--levelThree={size === 'three'}
    class:disabled
    {disabled}
  >
    <span>{text}</span><Icon icon="ChevronDownSvg_16" />
  </button>
</div>

<div class="header--layerNameRow header--layerRowContainer">
  <button 
    type="button" 
    class="header--copyableLayerName header--border"
    class:header--layerName--levelOne={size === 'one'}
    class:header--layerName--levelTwo={size === 'two'}
    class:header--layerName--levelThree={size === 'three'}
    class:disabled
    {disabled}
  >
    {text}
  </button>
</div>

<div class="header--layerNameRow header--layerRowContainer">
  <button 
    type="button"
    class:header--layerName--levelOne={size === 'one'}
    class:header--layerName--levelTwo={size === 'two'}
    class:header--layerName--levelThree={size === 'three'}
    class:disabled
    {disabled}
  >
    {text}
  </button>
</div>

<style lang="scss">
  .header--layerName--levelOne {
    padding-left: var(--spacer-2);
    font-family: var(--text-body-large-strong-font-family);
    font-size: var(--text-body-large-strong-font-size);
    font-weight: var(--text-body-large-strong-font-weight);
    letter-spacing: var(--text-body-large-strong-letter-spacing);
    line-height: var(--text-body-large-strong-line-height);
  }

  .header--layerName--levelTwo {
    padding-left: var(--spacer-2);
    font-family: var(--text-body-medium-strong-font-family);
    font-size: var(--text-body-medium-strong-font-size);
    font-weight: var(--text-body-medium-strong-font-weight);
    letter-spacing: var(--text-body-medium-strong-letter-spacing);
    line-height: var(--text-body-medium-strong-line-height);
  }

  .header--layerName--levelThree {
    padding-left: var(--spacer-2);
    font-family: var(--text-body-small-strong-font-family);
    font-size: var(--text-body-small-strong-font-size);
    font-weight: var(--text-body-small-strong-font-weight);
    letter-spacing: var(--text-body-small-strong-letter-spacing);
    line-height: var(--text-body-small-strong-line-height);
  }

  .header--layerNameRow {
    height: 40px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px 4px 16px;
  }

  .header--layerRowContainer {
    display: flex;
    gap: 4px;
  }

  .header--copyableLayerName:not(.disabled):hover {
    background: var(--color-bg-hover);
    color: var(--color-text);
    border-radius: 6px;
  }

  .disabled {
    color: var(--figma-color-text-disabled);
    pointer-events: none;
  }

  .header--border{
    padding: 2px 8px;
    border: 1px solid #f0f0f0;
    border-radius: 6px;
  }

  .header--copyableLayerName {
    display: flex;
    align-items: center;
    gap: 4px;
  }
</style>
