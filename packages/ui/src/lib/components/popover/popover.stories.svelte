<script context="module" lang="ts">
	import { Button, Popover } from '#ui';
	import { Story } from '@storybook/addon-svelte-csf';
	import Text from '../typography/text.svelte';

	export const meta = {
		title: 'Popover',
		component: Popover,
		argTypes: {
			positioning: {
				control: 'object',
				description: 'The positioning configuration for the floating element'
			},
			preventScroll: {
				control: 'boolean',
				description: 'Whether to prevent scrolling when the popover is open'
			},
			showArrow: {
				control: 'boolean',
				description: 'Shows an arrow pointing to the trigger'
			},
			showCloseButton: {
				control: 'boolean',
				description: 'Shows a close button in the header'
			},
			showHeader: {
				control: 'boolean',
				description: 'Shows a header section with optional title'
			},
			className: {
				control: 'text',
				description: 'Additional CSS class names'
			},
			ariaLabel: {
				control: 'text',
				description: 'Accessibility label for the trigger button'
			}
		}
	};

	const demoPlacements = ['top', 'right', 'left', 'bottom'] as const;
</script>

<Story name="Default">
	<div style="padding: 100px;">
		<Popover>
			<div slot="trigger">
				<button>Click me to toggle</button>
			</div>
			<div style="padding: 16px;">
				<p>This is the content of the popover.</p>
			</div>
		</Popover>
	</div>
</Story>

<Story name="With Header and Close Button">
	<div style="padding: 100px;">
		<Popover title="Popover Title" showHeader showCloseButton>
			<div slot="trigger">
				<button>With Header</button>
			</div>
			<div style="padding: 16px;">
				<p>This popover has a header with title and close button.</p>
			</div>
		</Popover>
	</div>
</Story>

<Story name="With Arrow">
	<div style="padding: 100px;">
		<Popover showArrow>
			<div slot="trigger">
				<button>With Arrow</button>
			</div>
			<div style="padding: 16px;">
				<p>This popover shows an arrow pointing to the trigger.</p>
			</div>
		</Popover>
	</div>
</Story>

<Story name="Full Featured">
	<div style="padding: 100px;">
		<Popover title="Popover Title" showHeader showCloseButton showArrow className="custom-class">
			<div slot="trigger">
				<button>Full Featured</button>
			</div>
			<div style="padding: 16px;">
				<p>This popover has all features enabled: header, title, close button, and arrow.</p>
			</div>
		</Popover>
	</div>
</Story>

<Story name="Placements">
	<div
		style="
		height: 400px;
		display: grid;
		place-items: center;
		grid-template-areas:
			'. top .'
			'left center right'
			'. bottom .';
		gap: 32px;
	"
	>
		{#each demoPlacements as placement}
			<div style="grid-area: {placement}">
				<Popover positioning={{ placement }} showArrow>
					<div slot="trigger">
						<button style="min-width: 100px;">Open {placement}</button>
					</div>
					<div style="padding: 16px;">
						<p>Popover on the {placement}</p>
					</div>
				</Popover>
			</div>
		{/each}
		<div style="grid-area: center; font-size: 0.875em; color: var(--color-text-secondary);">
			Try different placements
		</div>
	</div>
</Story>

<Story name="Stacking Popovers">
	<div>
		<Popover title="First Level" showHeader showArrow>
			<Button slot="trigger">Open First Popover</Button>

			<Text block>This is the first level popover.</Text>

			<div slot="footer">
				<Popover positioning={{ placement: 'right-start' }} showArrow>
					<Button slot="trigger" variant="inverse">Open Second Popover →</Button>

					<Text block>This is the second level popover.</Text>

					<Popover slot="footer" positioning={{ placement: 'right-start' }} showArrow>
						<Button slot="trigger" variant="inverse">Open Third Popover →</Button>

						<Text block>This is the third level popover.</Text>
					</Popover>
				</Popover>
			</div>
		</Popover>
	</div>
</Story>
