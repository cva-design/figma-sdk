<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import Checkbox from './checkbox.svelte';

	export const meta = {
		title: 'Components/Checkbox',
		component: Checkbox,
		argTypes: {
			checked: { control: 'boolean' },
			disabled: { control: 'boolean' },
			indeterminate: { control: 'boolean' },

			label: { control: 'text' },
			onChange: { action: 'changed' }
		},
		parameters: {
			layout: 'centered'
		}
	} satisfies Meta<typeof Checkbox>;
</script>

<Story
	name="Default"
	let:args={{
		label: 'Accept terms',
		onChange: (e) => console.log('changed:', e.currentTarget.checked)
	}}
>
	<Checkbox {...args} on:change={args.onChange} />
</Story>

<Story name="States">
	<div class="flex flex-col gap-4">
		<div class="flex items-center gap-4">
			<Checkbox label="Unchecked" />
			<Checkbox checked label="Checked" />
			<Checkbox indeterminate label="Indeterminate" />
		</div>

		<div class="flex items-center gap-4">
			<Checkbox disabled label="Disabled" />
			<Checkbox disabled checked label="Disabled checked" />
			<Checkbox disabled indeterminate label="Disabled indeterminate" />
		</div>
	</div>
</Story>

<Story name="WithDescription">
	<Checkbox label="Accept terms">
		<span slot="description">
			By checking this box, you agree to our Terms of Service and Privacy Policy.
		</span>
	</Checkbox>
</Story>

<Story name="WithLongLabel">
	<div style="width: 300px">
		<Checkbox
			label="This is a very long label that should wrap onto multiple lines to demonstrate how the checkbox handles long text content"
		/>
	</div>
</Story>

<Story name="Controlled">
	<script lang="ts">
		let isChecked = false;
		const handleChange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			isChecked = target.checked;
			console.log('Controlled value:', isChecked);
		};
	</script>

	<Checkbox checked={isChecked} on:change={handleChange} label="Controlled checkbox" />
	<div class="mt-2">Current value: {isChecked ? 'checked' : 'unchecked'}</div>
</Story>

<style>
	.flex {
		display: flex;
	}
	.flex-col {
		flex-direction: column;
	}
	.items-center {
		align-items: center;
	}
	.gap-4 {
		gap: 1rem;
	}
	.mt-2 {
		margin-top: 0.5rem;
	}
</style>
