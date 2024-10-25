<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { Text } from './index';

	export const meta = {
		title: 'ui/Text',
		component: Text,
		argTypes: {
			size: {
				control: 'select',
				options: ['small', 'medium', 'large']
			},
			weight: {
				control: 'radio',
				options: ['default', 'strong']
			},
			align: {
				control: 'radio',
				options: ['start', 'center', 'end']
			},
			block: {
				control: 'boolean'
			},
			as: {
				control: 'select',
				options: ['span', 'label', 'p', 'a']
			}
		}
	};
</script>

<Story name="Default" args={{ size: 'medium', weight: 'default', align: 'start', block: false }}>
	<Text {...$$props}>Default Text</Text>
</Story>

<Story name="Small" args={{ size: 'small', weight: 'default', align: 'start', block: false }}>
	<Text {...$$props}>Small Text</Text>
</Story>

<Story name="Large" args={{ size: 'large', weight: 'default', align: 'start', block: false }}>
	<Text {...$$props}>Large Text</Text>
</Story>

<Story name="Strong" args={{ size: 'medium', weight: 'strong', align: 'start', block: false }}>
	<Text {...$$props}>Strong Text</Text>
</Story>

<Story name="Centered" args={{ size: 'medium', weight: 'default', align: 'center', block: true }}>
	<Text {...$$props}>Centered Text</Text>
</Story>

<Story
	name="As Paragraph"
	args={{ size: 'medium', weight: 'default', align: 'start', block: false, as: 'p' }}
>
	<Text {...$$props}>This text is rendered as a paragraph.</Text>
</Story>

<Story name="Inline Semantics">
	<Text>
		<strong>This is strong text</strong> to highlight important points.
		<em>This is emphasized text</em>
		to indicate subtle importance. Use <code>inline code</code> for code snippets.
		<mark>This is marked text</mark>
		to draw attention.
	</Text>
</Story>
