<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let value: string;

	const { register } = getContext('tabs') as {
		register: (value: string) => { isSelected: Writable<boolean>; select: () => void };
	};
	const { isSelected } = register(value);

	$: isVisible = $isSelected;
</script>

{#if isVisible}
	<div class="fps-TabsContent {$$props.class || ''}" role="tabpanel">
		<slot />
	</div>
{/if}

<style lang="scss">
	.fp-TabsList {
  display: flex;
  overflow-y: auto;
  gap: var(--space-2);
}

.fp-TabsTrigger {
  all: unset;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  height: var(--space-6);
  padding: 0 var(--space-2);
  font-family: var(--font-family-default);
  font-size: var(--font-size-default);
  font-weight: var(--font-weight-default);
  letter-spacing: var(--letter-spacing-default);
  line-height: var(--line-height-default);
  white-space: nowrap;

  &:where([data-state='inactive']) {
    color: var(--figma-color-text-secondary);
    --color-icon: var(--figma-color-icon-secondary);
  }

  &:where([data-state='active']) {
    font-weight: var(--font-weight-strong);
    color: var(--figma-color-text);
    --color-icon: var(--figma-color-icon);
    background: var(--figma-color-bg-secondary);
    border-radius: var(--radius-medium);
  }
}
</style>
