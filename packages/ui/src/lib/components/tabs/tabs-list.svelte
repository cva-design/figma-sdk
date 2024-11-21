<script lang="ts">
	import './tabs-list.css';
  import { slide } from 'svelte/transition';
  import { Button } from '$ui/button';
  import { Icon } from '$ui/icon';
  
  export let class_: string | undefined = undefined;
  export let fullWidth: boolean = false;
  export let collapsible: boolean = false;
  
  let isExpanded = false;
  
  function toggleExpand() {
    isExpanded = !isExpanded;
  }
</script>

{#if collapsible}
  <div class="tabs-wrapper">
    <Button 
      variant="secondary" 
      on:click={toggleExpand} 
      class="toggle-button"
    >
      <Icon icon={isExpanded ? 'CaretDownSvg' : 'CaretRightSvg'} />
      <span class="toggle-text">Show Options</span>
    </Button>
    
    {#if isExpanded}
      <div 
        class="fp-TabsList {fullWidth ? 'full-width' : ''} {class_ || ''}"
        transition:slide
      >
        <slot />
      </div>
    {/if}
  </div>
{:else}
  <div class="fp-TabsList {fullWidth ? 'full-width' : ''} {class_ || ''}">
    <slot />
  </div>
{/if}
