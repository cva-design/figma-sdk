<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import type { Meta } from '@storybook/svelte';
	import { Button } from '../button';
	import { Disclosure, DisclosureItem } from '../disclosure/index.ts';
	import Text from '../text/text.svelte';
	import Sidebar from './sidebar.svelte';
	import type { SvelteComponent } from 'svelte';

	export const meta = {
		title: 'Sidebar',
		component: Sidebar,
		argTypes: {
			collapsed: { control: 'boolean' },
			position: {
				control: 'select',
				options: ['left', 'right']
			},
			width: { control: 'text' },
			collapsedWidth: { control: 'text' }
		}
	} satisfies Meta<SvelteComponent>;
</script>

<Story name="Default">
	<div style="height: 400px; display: flex;">
		<Sidebar>
			<div style="padding: var(--spacer-2);">
				<Text>Navigation</Text>
				<Disclosure>
					<DisclosureItem title="Menu Group 1">
						<Button variant="text" fullWidth>Menu Item 1.1</Button>
						<Button variant="text" fullWidth>Menu Item 1.2</Button>
						<Button variant="text" fullWidth>Menu Item 1.3</Button>
					</DisclosureItem>
					<DisclosureItem title="Menu Group 2">
						<Button variant="text" fullWidth>Menu Item 2.1</Button>
						<Button variant="text" fullWidth>Menu Item 2.2</Button>
					</DisclosureItem>
				</Disclosure>
			</div>
		</Sidebar>
		<div style="padding: var(--spacer-2); flex: 1;">
			<h2>Main Content</h2>
			<p>This is the main content area.</p>
		</div>
	</div>
</Story>

<Story name="Right Position">
	<div style="height: 400px; display: flex;">
		<div style="padding: var(--spacer-2); flex: 1;">
			<h2>Main Content</h2>
			<p>This is the main content area.</p>
		</div>
		<Sidebar position="right">
			<div style="padding: var(--spacer-2);">
				<Text>Settings</Text>
				<Disclosure>
					<DisclosureItem title="General Settings">
						<Button variant="text" fullWidth>Profile</Button>
						<Button variant="text" fullWidth>Preferences</Button>
					</DisclosureItem>
					<DisclosureItem title="Advanced Settings">
						<Button variant="text" fullWidth>Security</Button>
						<Button variant="text" fullWidth>Notifications</Button>
					</DisclosureItem>
				</Disclosure>
			</div>
		</Sidebar>
	</div>
</Story>

<Story name="Initially Collapsed">
	<div style="height: 400px; display: flex;">
		<Sidebar collapsed={true}>
			<div style="padding: var(--spacer-2);">
				<Text>Tools</Text>
				<Disclosure>
					<DisclosureItem title="Drawing Tools">
						<Button variant="text" fullWidth>Pen</Button>
						<Button variant="text" fullWidth>Brush</Button>
						<Button variant="text" fullWidth>Eraser</Button>
					</DisclosureItem>
					<DisclosureItem title="Shape Tools">
						<Button variant="text" fullWidth>Rectangle</Button>
						<Button variant="text" fullWidth>Circle</Button>
						<Button variant="text" fullWidth>Line</Button>
					</DisclosureItem>
				</Disclosure>
			</div>
		</Sidebar>
		<div style="padding: var(--spacer-2); flex: 1;">
			<h2>Canvas</h2>
			<p>This is the drawing canvas area.</p>
		</div>
	</div>
</Story>

<Story name="Custom Width">
	<div style="height: 400px; display: flex;">
		<Sidebar width="300px" collapsedWidth="60px">
			<div style="padding: var(--spacer-2);">
				<Text>Project Explorer</Text>
				<Disclosure>
					<DisclosureItem title="Project Files">
						<Button variant="text" fullWidth>index.html</Button>
						<Button variant="text" fullWidth>styles.css</Button>
						<Button variant="text" fullWidth>app.js</Button>
					</DisclosureItem>
					<DisclosureItem title="Assets">
						<Button variant="text" fullWidth>images</Button>
						<Button variant="text" fullWidth>fonts</Button>
					</DisclosureItem>
				</Disclosure>
			</div>
		</Sidebar>
		<div style="padding: var(--spacer-2); flex: 1;">
			<h2>Editor</h2>
			<p>This is the code editor area.</p>
		</div>
	</div>
</Story>

<style>
	/* Add padding around stories for better visibility */
	:global(.sb-show-main) {
		padding: 1rem;
	}

	/* Style the demo content */
	div :global(h2) {
		margin: 0;
		font-size: var(--text-heading-medium-font-size);
		font-weight: var(--font-weight-strong);
		color: var(--figma-color-text);
	}

	div :global(p) {
		color: var(--figma-color-text-secondary);
	}
</style>
