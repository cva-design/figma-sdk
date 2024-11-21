<script lang="ts">
	import './tabs.css';
  import { setContext } from 'svelte';
  import { writable, type Writable } from 'svelte/store';

  export let value: string = '';
  export let defaultValue: string | undefined = undefined;
  export let class_: string | undefined = undefined;

  const selectedTab: Writable<string> = writable(value || defaultValue || '');

  // Sync external value with internal state
  $: selectedTab.set(value);

  // Create context for child components
  setContext('tabs', {
    selectedTab,
    register: (tabValue: string) => {
      return {
        isSelected: selectedTab,
        select: () => {
          selectedTab.set(tabValue);
          value = tabValue;
        }
      };
    }
  });
</script>

<div class="fp-TabsRoot {class_ || ''}" role="tablist">
  <slot />
</div> 