<script context="module" lang="ts">
	import { Popover } from '$ui';
	import { Story } from '@storybook/addon-svelte-csf';
	import { PopoverPlacements } from './popover.svelte';

	export const meta = {
		title: 'Popover',
		component: Popover,
		argTypes: {
			isOpen: { control: 'boolean' },
			placement: {
				control: 'select',
				options: ['top', 'bottom', 'left', 'right']
			},
			offset: { control: 'number' }
		}
	};
</script>

<Story name="Default">
	<div style="padding: 100px;">
		<Popover >
			<div slot="trigger">
				<button>Click me to toggle</button>
			</div>
			<div style="padding: 16px;">
				<h3>Popover Content</h3>
				<p>This is the content of the popover.</p>
			</div>
		</Popover>
	</div>
</Story>

<Story name="Placements">
	<div style="display: flex; justify-content: space-between; padding: 100px;">
		{#each PopoverPlacements as placement}
			<Popover>
				<div slot="trigger">
					<button>Open {placement}</button>
				</div>

				<div style="padding: 8px;">
					{placement} popover
				</div>
			</Popover>
		{/each}
	</div>
</Story>
