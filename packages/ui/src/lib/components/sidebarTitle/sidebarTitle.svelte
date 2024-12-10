<script lang="ts">
  import { type VariantProps, cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";

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
    {text}
  </button>
</div>

<style lang="scss">
  .header--layerName--levelOne {
    font-weight: 600;
    color: var(--figma-color-text);
    min-width: 0;
    margin-left: -8px!important;
    padding: 0 8px!important;
    border-radius: 2px;
    user-select: text;
    outline: 2px solid transparent;
  }

  .header--layerName--levelTwo {
    font-weight: var(--font-weight-strong);
    padding-left: 0;
    display: flex;
    margin-left: -8px;
  }

  .header--layerName--levelThree {
    font-weight: 400;
    padding-left: 16px;
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
  }

  .disabled {
    color: var(--figma-color-text-disabled);
    pointer-events: none;
  }
</style>
