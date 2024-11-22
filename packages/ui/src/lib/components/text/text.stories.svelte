<script context="module" lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { Link, Text } from './index';

	export const meta = {
		title: 'Text',
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
				options: ['left', 'center', 'right']
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

<Template let:args let:content>
	<div style="display: flex; gap: 16px; flex-direction: column; width: 50%;">
		<Text {...args}>{content}</Text>
	</div>
</Template>

<Story name="Sizes">
	<div style="display: flex; gap: 16px; flex-direction: column;">
		<Text size="small">Small Text</Text>
		<Text>Default Text</Text>
		<Text size="large">Large Text</Text>
	</div>
</Story>

<Story name="Styling">
	<div style="display: flex; gap: 24px; flex-direction: column;">
		<div style="display: flex; gap: 16px; flex-direction: column;">
			<h3>Weights</h3>
			<div style="display: flex; gap: 16px; flex-direction: row;">
				<Text weight="default">Default Text</Text>
				<Text weight="strong">Strong Text</Text>
			</div>
		</div>
		<div style="display: flex; gap: 16px; flex-direction: column;">
			<h3>Alignments</h3>
			<Text align="left">Start Aligned Text</Text>
			<Text align="center">Center Aligned Text</Text>
			<Text align="right">End Aligned Text</Text>
		</div>
		<div style="display: flex; gap: 16px; flex-direction: column;">
			<h3>Inline Semantics</h3>
			<Text>
				<strong>This is strong text</strong> to highlight important points.
				<em>This is emphasized text</em>
				to indicate subtle importance. Use <code>inline code</code> for code snippets.
				<mark>This is marked text</mark>
				to draw attention. This is a link to <Link href="https://help.figma.com/"
					>Figma's documentation</Link
				>.
			</Text>
		</div>
	</div>
</Story>
