<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import type { SvelteComponent } from 'svelte';
	import Input from './input.svelte';

	export const meta = {
		title: 'Input',
		component: Input,
		argTypes: {
			value: { control: 'text' },
			placeholder: { control: 'text' },
			disabled: { control: 'boolean' },
			borders: { control: 'boolean' },
			invalid: { control: 'boolean' },
			errorMessage: { control: 'text' },
			type: {
				control: 'select',
				options: ['text', 'password', 'email', 'number']
			},
			iconUrl: { control: 'text' },
			iconText: { control: 'text' },
			spin: { control: 'boolean' }
		}
	} satisfies Meta<SvelteComponent>;
</script>

<Story name="Default">
	<Input placeholder="Type something..." />
</Story>

<Story name="WithIcon">
	<Input iconName="SearchSvg" placeholder="Search..." />
</Story>

<Story name="WithIconText">
	<Input iconText="$" placeholder="Enter amount..." />
</Story>

<Story name="WithBorders">
	<Input bordered placeholder="With borders..." />
</Story>

<Story name="Disabled">
	<Input disabled placeholder="Disabled input..." />
</Story>

<Story name="Invalid">
	<Input invalid errorMessage="This field is required" placeholder="Invalid input..." />
</Story>

<Story name="Password">
	<Input type="password" placeholder="Enter password..." />
</Story>

<Story name="SpinningIcon">
	<Input iconName="SpinnerSvg" spin placeholder="Loading..." />
</Story>

<Story name="FullWidth">
	<div style="width: 100%;">
		<Input placeholder="Full width input..." />
	</div>
</Story>

<Story name="WithValue">
	<Input value="Prefilled value" />
</Story>

<Story name="ColorField">
	<div class="input-connected-container">
		<div class="color-chit" aria-label="Solid color hex: 000000">
		</div>
		<Input
			value="000000"
			placeholder="000000"
			connected="left"
			class="connected-left"
		/>
		<div class="input-separator"></div>
		<Input
			value="100"
			placeholder="100"
			type="number"
			connected="right"
			class="connected-right"
		/>
		<div class="unit-label">%</div>
	</div>
</Story>
