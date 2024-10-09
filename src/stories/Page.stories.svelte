<script context="module">
import Page from './Page.svelte';

export const meta = {
  title: 'Example/Page',
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
};
</script>

<script>
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { expect, userEvent, within } from '@storybook/test';
</script>

<Template let:args>
	<Page {...args} />
</Template>

<Story name="LoggedOut" />

<Story
	name="LoggedIn"
	play={async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const loginButton = canvas.getByRole('button', { name: /Log in/i });
		await expect(loginButton).toBeInTheDocument();
		await userEvent.click(loginButton);
		await expect(loginButton).not.toBeInTheDocument();

		const logoutButton = canvas.getByRole('button', { name: /Log out/i });
		await expect(logoutButton).toBeInTheDocument();
	}}
/>
