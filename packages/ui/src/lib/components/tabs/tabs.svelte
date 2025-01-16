<script lang="ts">
	import { type VariantProps, cva } from 'class-variance-authority';
	import { setContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Writable, derived, writable } from 'svelte/store';

	const tabs = cva('fps-TabsRoot', {
		variants: {
			orientation: {
				horizontal: 'fps-orientation-horizontal',
				vertical: 'fps-orientation-vertical'
			}
		},
		defaultVariants: {
			orientation: 'horizontal'
		}
	});

	interface $$Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabs> {
		value?: string;
		defaultValue?: string;
	}

	export let value = '';
	export let defaultValue: string | undefined = undefined;
	export let orientation: $$Props['orientation'] = 'horizontal';

	const selectedTab: Writable<string> = writable(value || defaultValue || '');

	// Sync external value with internal state
	$: selectedTab.set(value || defaultValue || '');

	// Create context for child components
	setContext('tabs', {
		selectedTab,
		register: (tabValue: string) => {
			return {
				isSelected: derived(selectedTab, ($selectedTab) => $selectedTab === tabValue),
				select: () => {
					selectedTab.set(tabValue);
					value = tabValue;
				}
			};
		}
	});
</script>

<div class={tabs({ orientation, class: $$props.class })} role="tablist">
	<slot />
</div>

<style lang="scss">
	.fps-TabsRoot {
		display: flex;
		gap: var(--spacer-2);
		flex-shrink: 0;
		padding-bottom: 2px;
		// justify-content: flex-start;
		// align-items: center;
		// height: 40px;

		word-break: keep-all;

		&:where(.fps-orientation-horizontal) {
			flex-direction: column;
		}

		&:where(.fps-orientation-vertical) {
			flex-direction: row;
		}
	}
</style>
