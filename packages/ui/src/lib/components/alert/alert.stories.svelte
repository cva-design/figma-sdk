<script context="module" lang="ts">
	import { Text } from '#ui';
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import type { SvelteComponent } from 'svelte';
	import Alert from './alert.svelte';

	export const meta = {
		title: 'Alert',
		component: Alert,
		argTypes: {
			type: {
				control: 'select',
				options: ['success', 'warning', 'danger', 'hint', 'info']
			},
			position: {
				control: 'select',
				options: ['toast', 'block']
			}
		}
	} satisfies Meta<SvelteComponent>;
</script>

<Story
	name="Success Toast"
	args={{
		type: 'success',
		position: 'toast'
	}}
>
	<Alert type="success" position="toast">
		<Text>This is a success message</Text>
	</Alert>
</Story>

<Story
	name="Success Block"
	args={{
		type: 'success',
		position: 'block'
	}}
>
	<Alert type="success" position="block">
		<Text>This is a success message</Text>
	</Alert>
</Story>

<Story
	name="Warning Toast"
	args={{
		type: 'warning',
		position: 'toast'
	}}
>
	<Alert type="warning" position="toast">
		<Text>This is a warning message</Text>
	</Alert>
</Story>

<Story
	name="Warning Block"
	args={{
		type: 'warning',
		position: 'block'
	}}
>
	<Alert type="warning" position="block">
		<Text>This is a warning message</Text>
	</Alert>
</Story>

<Story
	name="Danger Toast"
	args={{
		type: 'danger',
		position: 'toast'
	}}
>
	<Alert type="danger" position="toast">
		<Text>This is a danger message</Text>
	</Alert>
</Story>

<Story
	name="Danger Block"
	args={{
		type: 'danger',
		position: 'block'
	}}
>
	<Alert type="danger" position="block">
		<Text>This is a danger message</Text>
	</Alert>
</Story>

<Story
	name="Hint Toast"
	args={{
		type: 'hint',
		position: 'toast'
	}}
>
	<Alert type="hint" position="toast">
		<Text>This is a hint message</Text>
	</Alert>
</Story>

<Story
	name="Hint Block"
	args={{
		type: 'hint',
		position: 'block'
	}}
>
	<Alert type="hint" position="block">
		<Text>This is a hint message</Text>
	</Alert>
</Story>

<Story
	name="Info Toast"
	args={{
		type: 'info',
		position: 'toast'
	}}
>
	<Alert type="info" position="toast">
		<Text>This is an info message</Text>
	</Alert>
</Story>

<Story
	name="Info Block"
	args={{
		type: 'info',
		position: 'block'
	}}
>
	<Alert type="info" position="block">
		<Text>This is an info message</Text>
	</Alert>
</Story>
