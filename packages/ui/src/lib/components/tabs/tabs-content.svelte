<script lang="ts">
	import { type VariantProps, cva } from 'class-variance-authority';
	import { getContext } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Writable } from 'svelte/store';

	const tabsContent = cva('fps-TabsContent', {
		variants: {
			animate: {
				true: 'fps-animate'
			}
		},
		defaultVariants: {
			animate: false
		}
	});

	interface $$Props extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsContent> {
		value: string;
	}

	export let value: string;
	export let animate: $$Props['animate'] = false;
	const className: string | undefined = undefined;
	export { className as class };

	const { selectedTab } = getContext('tabs') as {
		selectedTab: Writable<string>;
	};

	$: isVisible = $selectedTab === value;
</script>

{#if isVisible}
	<div class={tabsContent({ animate, class: className })} role="tabpanel">
		<slot />
	</div>
{/if}

<style lang="scss">
	.fps-TabsContent {
		&:where(.fps-animate) {
			animation: contentShow 200ms ease-out;
		}
	}

	@keyframes contentShow {
		from {
			opacity: 0;
			transform: translateY(2px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
