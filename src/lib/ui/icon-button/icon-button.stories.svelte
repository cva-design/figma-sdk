<script context="module" lang="ts">
	import { Story } from '@storybook/addon-svelte-csf';
	import { IconButton } from '.';

	export const meta = {
		title: 'Components/Icon Button',
		component: IconButton,
		parameters: {
			controls: { expanded: true },
			fixedWidth: true
		},
		argTypes: {
			'aria-label': {
				description: 'Text for screen readers, also used as tooltip text by default.',
				type: 'string',
				required: true
			},
			size: {
				description: 'Size of the button.',
				options: ['small', 'medium'],
				control: { type: 'radio' },
				defaultValue: 'small'
			},
			variant: {
				description: 'Visual variant of the button when in active/pressed mode',
				options: ['subtle', 'solid'],
				control: { type: 'radio' },
				defaultValue: 'subtle'
			},
			disabled: {
				type: 'boolean'
			},
			tooltipContent: {
				description: 'Custom content for the tooltip. Defaults to aria-label if not specified.',
				type: 'string'
			},
			disableTooltip: {
				description: "Disables the tooltip. Use sparingly when the button's function is clear.",
				type: 'boolean'
			}
		}
	};
</script>

<Story name="Default">
	<IconButton
		appearance={{ default: { icon: 'StylesSvg' } }}
		tooltip="Open popover"
		variant="subtle"
		size="small"
	/>
</Story>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-2);
	}

	.section {
		padding: var(--space-2);
	}
</style>
