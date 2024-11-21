<script context="module" lang="ts">
	import { Disclosure, DisclosureItem } from '$ui';
	import { Story, Template } from '@storybook/addon-svelte-csf';

	export const meta = {
		
		component: Disclosure,
		argTypes: {
			onChange: { action: 'changed' }
		}
	};
</script>

<Template let:args>
	<Disclosure {...args} on:change={args.onChange}>
		<DisclosureItem title="Item 1" uniqueId="item1">Content for Item 1</DisclosureItem>
		<DisclosureItem title="Item 2" uniqueId="item2">Content for Item 2</DisclosureItem>
		<DisclosureItem title="Item 3" uniqueId="item3">Content for Item 3</DisclosureItem>
	</Disclosure>
</Template>

<Story name="Default" args={{}} />

<Story
	name="With Open Item"
	args={{
		selected: 'item2'
	}}
/>

<Story name="With Section" args={{}}>
	<Disclosure>
		<DisclosureItem title="Section 1" uniqueId="section1" section>
			<DisclosureItem title="Item 1.1" uniqueId="item1.1">Content for Item 1.1</DisclosureItem>
			<DisclosureItem title="Item 1.2" uniqueId="item1.2">Content for Item 1.2</DisclosureItem>
		</DisclosureItem>
		<DisclosureItem title="Section 2" uniqueId="section2" section>
			<DisclosureItem title="Item 2.1" uniqueId="item2.1">Content for Item 2.1</DisclosureItem>
			<DisclosureItem title="Item 2.2" uniqueId="item2.2">Content for Item 2.2</DisclosureItem>
		</DisclosureItem>
	</Disclosure>
</Story>
