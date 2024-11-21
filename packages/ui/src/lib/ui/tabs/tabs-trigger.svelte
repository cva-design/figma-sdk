<script lang="ts">
	import './tabs-trigger.css';
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  
  export let value: string;
  let className: string | undefined = undefined;
  export { className as class};
  export let expand: boolean = false;

  const { register } = getContext('tabs');
  const { isSelected, select } = register(value);
  
  let triggerElement: HTMLButtonElement;
  
  $: isActive = $isSelected === value;
  
  onMount(() => {
    if (triggerElement && !expand) {
      triggerElement.style.width = `${triggerElement.getBoundingClientRect().width}px`;
    }
  });
</script>

<button
  bind:this={triggerElement}
  class="fp-TabsTrigger {expand ? 'expand' : ''} {className || ''}"
  role="tab"
  aria-selected={isActive}
  data-state={isActive ? 'active' : 'inactive'}
  on:click={select}
>
  <slot />
</button>
