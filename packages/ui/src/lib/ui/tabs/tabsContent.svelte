<script lang="ts">
  import { getContext } from 'svelte';
  
  export let value: string;
  let className: string | undefined = undefined;
  export { className as class};
  const { register } = getContext('tabs');
  const { isSelected } = register(value);
  
  $: isVisible = $isSelected === value;
</script>

{#if isVisible}
  <div class="fp-TabsContent {className || ''}" role="tabpanel">
    <slot />
  </div>
{/if} 