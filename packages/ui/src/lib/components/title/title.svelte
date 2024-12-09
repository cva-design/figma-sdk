<script lang="ts">
  import { type VariantProps, cva } from "class-variance-authority";
  import type { HTMLAttributes } from "svelte/elements";
</script>

<div class="header--layerNameRow header--layerRowContainer">
  <button type="button" class=" header--layerName--levelOne header--copyableLayerName">
    Level One
  </button>
</div>

<div class="header--layerNameRow header--layerRowContainer">
  <button type="button" class=" header--layerName--levelTwo header--copyableLayerName">
    Level Two
  </button>
</div>


<div class="header--layerNameRow header--layerRowContainer">
  <button type="button" class=" header--layerName--levelThree header--copyableLayerName">
    Level Three
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
    -webkit-user-select: text;
    user-select: text;
    outline: 2px solid transparent;
  }

  .header--layerName--levelOne:focus-visible {
    outline: 2px solid var(--color-border-selected);
    outline-offset: -2px
  }

  .header--layerName--levelOne:focus {
    outline: 2px solid var(--color-border-selected);
    outline-offset: -2px
  }

  .header--layerName--levelOne:focus:not(:focus-visible) {
    outline: 2px solid transparent
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
  .header--copyableLayerName:hover {
    background: var(--color-bg-hover);
    color: var(--color-text);
  }
  .toolbar_view--actionButtonContainer {
    position: relative;
  }
  .header--headerButtons {
    gap: var(--spacer-1);
  }

// Level two
.raw_components--panelTitle--levelTwo {
    width: 100%;
    font-weight: 600;
    letter-spacing: 1%;
    align-self: center;
    grid-column-start: 1;
    grid-column-end: span 10;
    padding-left: 8px
}

.raw_components--panelTitle--levelTwo {
    padding-left: 0;
    display: flex;
    margin-left: -8px;
    font-weight: var(--font-weight-strong);
}
.raw_components--panelTitle--levelTwo.raw_components--collapsiblePanelTitle--PXa3p {
    display: flex;
    padding-left: 0;
    align-items: center
}
</style>
