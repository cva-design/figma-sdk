<script context="module" lang="ts">
import { Story } from "@storybook/addon-svelte-csf";
import type { Meta } from "@storybook/svelte";
import { TabsContent, TabsList, TabsTrigger } from ".";
import Tabs from "./tabs.svelte";

export const meta = {
	title: "Tabs",
	component: Tabs,
	argTypes: {
		value: { control: "text" },
		defaultValue: { control: "text" },
		class: { control: "text" },
	},
} satisfies Meta<typeof Tabs>;
</script>

<Story name="Default">
	<Tabs defaultValue="tab1">
		<TabsList>
			<TabsTrigger value="tab1">Account</TabsTrigger>
			<TabsTrigger value="tab2">Password</TabsTrigger>
			<TabsTrigger value="tab3">Settings</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1">
			<div class="content">Account settings content</div>
		</TabsContent>
		<TabsContent value="tab2">
			<div class="content">Password settings content</div>
		</TabsContent>
		<TabsContent value="tab3">
			<div class="content">Other settings content</div>
		</TabsContent>
	</Tabs>
</Story>

<Story name="WithIcons">
	<Tabs defaultValue="tab1">
		<TabsList>
			<TabsTrigger value="tab1">
				<span class="icon">👤</span>
				Profile
			</TabsTrigger>
			<TabsTrigger value="tab2">
				<span class="icon">⚙️</span>
				Settings
			</TabsTrigger>
			<TabsTrigger value="tab3">
				<span class="icon">📱</span>
				Devices
			</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1">
			<div class="content">Profile content</div>
		</TabsContent>
		<TabsContent value="tab2">
			<div class="content">Settings content</div>
		</TabsContent>
		<TabsContent value="tab3">
			<div class="content">Devices content</div>
		</TabsContent>
	</Tabs>
</Story>

<Story name="WithCustomClass">
	<Tabs defaultValue="tab1" class_="custom-tabs">
		<TabsList class_="custom-list">
			<TabsTrigger value="tab1" class="custom-trigger">Tab 1</TabsTrigger>
			<TabsTrigger value="tab2" class="custom-trigger">Tab 2</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1" class="custom-content">
			<div class="content">Content for Tab 1</div>
		</TabsContent>
		<TabsContent value="tab2" class="custom-content">
			<div class="content">Content for Tab 2</div>
		</TabsContent>
	</Tabs>
</Story>

<Story name="WithLongContent">
	<Tabs defaultValue="tab1">
		<TabsList>
			<TabsTrigger value="tab1">First Tab</TabsTrigger>
			<TabsTrigger value="tab2">Second Tab with Longer Text</TabsTrigger>
			<TabsTrigger value="tab3">Third Tab</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1">
			<div class="content">
				<h3>First Tab Content</h3>
				<p>This is the content for the first tab. It can contain any elements.</p>
			</div>
		</TabsContent>
		<TabsContent value="tab2">
			<div class="content">
				<h3>Second Tab Content</h3>
				<p>This tab has more content to demonstrate how the tabs handle longer content sections.</p>
				<ul>
					<li>List item 1</li>
					<li>List item 2</li>
					<li>List item 3</li>
				</ul>
			</div>
		</TabsContent>
		<TabsContent value="tab3">
			<div class="content">
				<h3>Third Tab Content</h3>
				<p>Content for the third tab.</p>
			</div>
		</TabsContent>
	</Tabs>
</Story>

<Story name="ExpandedTabs">
	<Tabs defaultValue="tab1">
		<TabsList fullWidth>
			<TabsTrigger value="tab1" expand>Tab 1</TabsTrigger>
			<TabsTrigger value="tab2" expand>Tab 2</TabsTrigger>
			<TabsTrigger value="tab3" expand>Tab 3</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1">
			<div class="content">First tab content</div>
		</TabsContent>
		<TabsContent value="tab2">
			<div class="content">Second tab content</div>
		</TabsContent>
		<TabsContent value="tab3">
			<div class="content">Third tab content</div>
		</TabsContent>
	</Tabs>
</Story>

<Story name="CollapsibleTabs">
	<Tabs defaultValue="tab1">
		<TabsList collapsible>
			<TabsTrigger value="tab1">First Option</TabsTrigger>
			<TabsTrigger value="tab2">Second Option</TabsTrigger>
			<TabsTrigger value="tab3">Third Option</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1">
			<div class="content">First tab content</div>
		</TabsContent>
		<TabsContent value="tab2">
			<div class="content">Second tab content</div>
		</TabsContent>
		<TabsContent value="tab3">
			<div class="content">Third tab content</div>
		</TabsContent>
	</Tabs>
</Story>

<Story name="CollapsibleExpandedTabs">
	<Tabs defaultValue="tab1">
		<TabsList collapsible fullWidth>
			<TabsTrigger value="tab1" expand>First Option</TabsTrigger>
			<TabsTrigger value="tab2" expand>Second Option</TabsTrigger>
			<TabsTrigger value="tab3" expand>Third Option</TabsTrigger>
		</TabsList>
		<TabsContent value="tab1">
			<div class="content">First tab content</div>
		</TabsContent>
		<TabsContent value="tab2">
			<div class="content">Second tab content</div>
		</TabsContent>
		<TabsContent value="tab3">
			<div class="content">Third tab content</div>
		</TabsContent>
	</Tabs>
</Story>

<style>
	.content {
		padding: var(--space-4);
		background: var(--figma-color-bg);
		border-radius: var(--radius-medium);
		margin-top: var(--space-2);
	}

	.icon {
		margin-right: var(--space-2);
	}

	/* Add padding around stories for better visibility */
	:global(.sb-show-main) {
		padding: 1rem;
	}

	h3 {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-default);
		font-weight: var(--font-weight-strong);
	}

	p {
		margin: 0 0 var(--space-2) 0;
		font-size: var(--font-size-default);
	}

	ul {
		margin: 0;
		padding-left: var(--space-4);
	}

	li {
		margin-bottom: var(--space-1);
	}
</style>
