<script context="module" lang="ts">
	import { IconToggle, type ToggleStates } from '$ui';
	import { Story } from '@storybook/addon-svelte-csf';

	export const meta = {
		title: 'IconToggle',
		component: IconToggle,
		parameters: {
			fixedWidth: true
		}
	};

	const visibilityStates: ToggleStates = {
		on: {
			icon: 'VisibilityVisibleSvg_16',
			tooltip: 'Hide layer'
		},
		off: {
			icon: 'VisibilityHiddenSvg_16',
			tooltip: 'Show layer'
		},
		disabled: {
			tooltip: 'Visibility cannot be changed'
		}
	};

	const lockStates: ToggleStates = {
		on: {
			icon: 'LockLockedSvg_16',
			tooltip: 'Unlock layer'
		},
		off: {
			icon: 'LockUnlockedSvg_16',
			tooltip: 'Lock layer'
		},
		disabled: {
			on: {
				icon: 'LockLockedSvg_16',
				tooltip: 'Cannot unlock layer'
			},
			off: {
				icon: 'LockUnlockedSvg_16',
				tooltip: 'Cannot lock layer'
			}
		}
	};
</script>

<Story name="Visibility Toggle">
	<IconToggle states={visibilityStates} />
</Story>

<Story name="Visibility Toggle Active">
	<IconToggle states={visibilityStates} on />
</Story>

<Story name="Visibility Toggle Disabled">
	<IconToggle states={visibilityStates} disabled />
</Story>

<Story name="Lock Toggle">
	<IconToggle states={lockStates} />
</Story>

<Story name="Lock Toggle Active">
	<IconToggle states={lockStates} on />
</Story>

<Story name="Lock Toggle Disabled">
	<IconToggle states={lockStates} on disabled />
</Story>

<Story name="Lock Toggle Disabled Inactive">
	<IconToggle states={lockStates} disabled />
</Story>
