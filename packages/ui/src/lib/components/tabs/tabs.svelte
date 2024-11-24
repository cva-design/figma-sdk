<script lang="ts">
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

<div class="fps-TabsRoot {class_ || ''}" role="tablist">
	<slot />
</div>

<style lang="scss">
	.fps-TabsList {
		display: flex;
		overflow-y: auto;
		gap: var(--space-2);
	}

	.fps-TabsTrigger {
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
