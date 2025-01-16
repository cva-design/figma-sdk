<script lang="ts">
	import { createDropdownMenu } from '@melt-ui/svelte';
	import { writable } from 'svelte/store';

	const settingsSync = writable(true);
	const hideMeltUI = writable(false);

	const {
		elements: { trigger, menu, item, separator, arrow, overlay },
		builders: { createSubmenu, createMenuRadioGroup, createCheckboxItem },
		states: { open }
	} = createDropdownMenu({
		forceVisible: true,
		loop: true
	});

	const {
		elements: { subMenu, subTrigger },
		states: { subOpen }
	} = createSubmenu();

	const {
		elements: { radioGroup, radioItem },
		helpers: { isChecked }
	} = createMenuRadioGroup({
		defaultValue: 'Hunter Johnston'
	});

	const {
		elements: { checkboxItem }
	} = createCheckboxItem({
		checked: settingsSync
	});

	const {
		elements: { checkboxItem: checkboxItemA }
	} = createCheckboxItem({
		checked: hideMeltUI
	});

	const personsArr = ['Hunter Johnston', 'Thomas G. Lopes', 'Adrian Gonz', 'Franck Poingt'];
</script>

<style lang="scss">
	.fp-MenuContent {
		box-sizing: border-box;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		cursor: default;
		padding: var(--spacer-2);
		background-color: var(--color-bg-menu);
		border-radius: var(--radius-large);
		font-size: var(--font-size-menu);
		font-family: var(--font-family-default);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--letter-spacing-default);
		color: var(--color-text-menu);
		box-shadow: var(--elevation-400);
	}

	.fp-MenuItem {
		position: relative;
		display: flex;
		align-items: center;
		height: var(--spacer-4);
		padding: 0 var(--spacer-2);
		color: var(--color-text-menu);
		line-height: 1rem;
		white-space: nowrap;
		border-radius: var(--radius-medium);

		&:hover {
			outline: 0;
			background-color: var(--color-bg-menu-selected);
		}

		&[data-disabled] {
			color: var(--color-text-menu-tertiary);
		}
	}

	.fp-MenuItem:hover {
		background-color: #fff;
	}

	.fp-MenuSeparator {
		margin: var(--spacer-2) 0;
		height: 1px;
		background-color: var(--color-border-menu);
	}

	.fp-MenuLabel {
		display: flex;
		align-items: center;
		height: var(--spacer-4);
		padding: 0 var(--spacer-3);
		color: var(--color-text-menu-tertiary);

		&:where(.fp-MenuContent:has(.fp-MenuCheckboxItem, .fp-MenuRadioItem) &) {
			padding-left: var(--spacer-4);
		}
	}

	.fp-MenuGroup {
		padding: var(--spacer-2) 0;

		&:first-child {
			padding-top: 0;
		}

		&:last-child {
			padding-bottom: 0;
		}

		&:not(:first-child) {
			border-top: 1px solid var(--color-border-menu);
		}
	}

	.fp-MenuSubtriggerCaret {
		margin-left: auto;
		margin-right: calc(-1 * var(--spacer-2));
		padding-left: var(--spacer-4);
		--color-icon: var(--color-icon-menu);
	}

	.fp-MenuCheckboxItem,
	.fp-MenuRadioItem {
		padding-left: var(--spacer-4);
	}

	.fp-MenuItemIndicator {
		position: absolute;
		left: var(--spacer-1);
		--color-icon: var(--color-icon-menu);
	}
</style>
