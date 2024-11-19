<script lang="ts">
  import { getContext } from 'svelte';
  
  export let value: string;
  export let class_: string | undefined = undefined;

  const { register } = getContext('tabs');
  const { isSelected } = register(value);
  
  $: isVisible = $isSelected === value;
</script>

{#if isVisible}
  <div class="fp-TabsContent {class_ || ''}" role="tabpanel">
    <slot />
  </div>
{/if} 