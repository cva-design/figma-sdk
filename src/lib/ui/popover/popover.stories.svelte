<script context="module" lang="ts">
	import { Popover } from '$ui';
	import { Story } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'ui/Popover',
		component: Popover,
		argTypes: {
			isOpen: { control: 'boolean' },
			placement: {
				control: 'select',
				options: ['top', 'bottom', 'left', 'right']
			},
			offset: { control: 'number' },
			onClose: { action: 'closed' }
		}
	};
</script>

<script lang="ts">
	let anchorElement: HTMLButtonElement;
	let isOpen = false;

	function togglePopover() {
		isOpen = !isOpen;
	}

	function handleClose() {
		isOpen = false;
	}
</script>

<Story name="Default">
	<div style="padding: 100px;">
		<button bind:this={anchorElement} on:click={togglePopover}> Toggle Popover </button>
		<Popover {isOpen} anchor={anchorElement} placement="bottom" offset={8} on:close={handleClose}>
			<div style="padding: 16px;">
				<h3>Popover Content</h3>
				<p>This is the content of the popover.</p>
			</div>
		</Popover>
	</div>
</Story>

<Story name="Placements">
	<div style="display: flex; justify-content: space-between; padding: 100px;">
		{#each ['top', 'bottom', 'left', 'right'] as placement}
			<div>
				<button on:click={() => (isOpen = placement)}>
					Open {placement}
				</button>
				<Popover
					isOpen={isOpen === placement}
					anchor={anchorElement}
					{placement}
					offset={8}
					on:close={handleClose}
				>
					<div style="padding: 8px;">
						{placement} popover
					</div>
				</Popover>
			</div>
		{/each}
	</div>
</Story>
