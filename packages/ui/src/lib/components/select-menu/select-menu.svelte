<script lang="ts">
	import { clickOutside } from '#actions/click-outside';
	import { getIconProps, Icon, Text, type IconProps } from '#ui';
	import { createEventDispatcher, onMount } from 'svelte';
	import SelectDivider from './select-divider.svelte';
	import SelectItem from './select-item.svelte';
	import type { SelectMenuItem } from './types';

	type $$Props = IconProps & {
		border?: boolean;
		disabled?: boolean;
		macOSBlink?: boolean;
		menuItems?: SelectMenuItem[];
		placeholder?: string;
		value?: SelectMenuItem | null;
		showGroupLabels?: boolean;
		anchor?:
			| 'top'
			| 'right'
			| 'bottom'
			| 'left'
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right';
	};

	let disabled: $$Props['disabled'] = $$props.disabled ?? false;
	let value: $$Props['value'] = $$props.value ?? null;
	const anchor: NonNullable<$$Props['anchor']> = $$props.anchor ?? 'bottom-left';
	const macOSBlink: $$Props['macOSBlink'] = $$props.macOSBlink ?? false;
	const menuItems: NonNullable<$$Props['menuItems']> = $$props.menuItems ?? [];
	const placeholder: $$Props['placeholder'] = $$props.placeholder ?? 'Please make a selection.';
	const showGroupLabels: $$Props['showGroupLabels'] = $$props.showGroupLabels ?? false;
	const className: $$Props['class'] = $$props.class ?? undefined;
	const border: $$Props['border'] = $$props.border ?? false;

	const dispatch = createEventDispatcher();

	const groups = checkGroups();
	let menuWrapper: HTMLDivElement, menuButton: HTMLButtonElement, menuList: HTMLUListElement;
	$: updateSelectedAndIds();

	//FUNCTIONS

	//assign id's to the input array
	onMount(async () => {
		console.clear();
		updateSelectedAndIds();
	});

	// this function runs everytime the menuItems array os updated
	// it will auto assign ids and keep the value var updated
	function updateSelectedAndIds() {
		if (menuItems) {
			menuItems.forEach((item, index) => {
				//update id
				item.id = index;
				//update selection
				if (item.selected === true) {
					value = item;
				}
			});

			//set placeholder
			if (menuItems.length <= 0) {
				// placeholder = 'There are no items to select';
				disabled = true;
			} else if (!disabled) {
				// placeholder = 'Please make a selection';
				disabled = false;
			}
		}
	}

	//determine if option groups are present
	function checkGroups() {
		let groupCount = 0;
		if (menuItems) {
			menuItems.forEach((item) => {
				if (item.group != null) {
					groupCount++;
				}
			});
			if (groupCount === menuItems.length) {
				return true;
			} else {
				return false;
			}
		}
		return false;
	}

	//menu highlight function on the selected menu item
	function removeHighlight(event: Event) {
		const items = Array.from((event.target as HTMLElement).parentNode!.children);
		items.forEach((item) => {
			(item as HTMLElement).blur();
			(item as HTMLElement).classList.remove('highlight');
		});
	}

	function closeMenu() {
		menuList.classList.add('hidden');
		menuButton.classList.remove('selected');
		// Clear inline styles
		menuList.style.height = '';
		menuList.style.maxHeight = '472px';
		menuList.style.top = '';
		menuList.style.bottom = '34px';
	}

	//run for all menu click events
	//this opens/closes the menu
	function menuClick(event: Event) {
		resetMenuProperties();

		// If clicking outside or no target, hide menu
		if (!event.target) {
			closeMenu();
			return;
		}

		// Handle button click - check if click is on button or any of its children
		const clickedElement = event.target as HTMLElement;
		const isButtonClick = menuButton.contains(clickedElement) || clickedElement === menuButton;

		if (isButtonClick) {
			if (menuList.classList.contains('hidden')) {
				menuList.classList.remove('hidden');
				menuButton.classList.add('selected');

				// Position menu and focus appropriate item
				const selectedIndex = value ? value.id : 0;
				const targetItem = menuList.querySelector(`[itemId="${selectedIndex}"]`) as HTMLElement;

				if (targetItem) {
					targetItem.focus();
					positionMenu(targetItem);
				}
			} else {
				menuList.classList.add('hidden');
				menuButton.classList.remove('selected');
			}
			return;
		}

		// Handle menu item click
		if (menuList.contains(event.target as Node)) {
			const itemId = Number.parseInt((event.target as HTMLElement).getAttribute('itemId')!);

			if (value) {
				menuItems[value.id!].selected = false;
			}

			menuItems[itemId].selected = true;
			value = menuItems[itemId];
			updateSelectedAndIds();
			dispatch('change', menuItems[itemId]);

			if (macOSBlink) {
				handleMacOSBlink(event);
			} else {
				menuList.classList.add('hidden');
				menuButton.classList.remove('selected');
			}
		}
	}

	// New helper function for menu positioning
	function positionMenu(targetItem: HTMLElement) {
		const buttonRect = menuButton.getBoundingClientRect();

		// Set width to fit content but not smaller than button
		menuList.style.width = 'max-content';
		menuList.style.minWidth = `${buttonRect.width}px`;

		const menuRect = menuList.getBoundingClientRect();
		const spaceAbove = buttonRect.top;
		const spaceBelow = window.innerHeight - buttonRect.bottom;

		// Reset styles
		menuList.style.left = '';
		menuList.style.right = '';
		menuList.style.top = '';
		menuList.style.bottom = '';
		menuList.style.maxHeight = '472px';
		menuList.style.transform = '';

		// Handle vertical positioning
		if (anchor.includes('top') || anchor === 'top') {
			menuList.style.top = `${buttonRect.top - menuRect.height - 4}px`;
			menuList.style.maxHeight = `${Math.min(472, spaceAbove - 10)}px`;
		} else if (anchor.includes('bottom') || anchor === 'bottom') {
			menuList.style.top = `${buttonRect.bottom + 4}px`;
			menuList.style.maxHeight = `${Math.min(472, spaceBelow - 10)}px`;
		}

		// Handle horizontal positioning
		if (anchor.includes('right') || anchor === 'right') {
			menuList.style.left = `${buttonRect.right - menuRect.width}px`;
		} else if (anchor.includes('left') || anchor === 'left') {
			menuList.style.left = `${buttonRect.left}px`;
		}

		// Handle single direction anchors
		if (anchor === 'top' || anchor === 'bottom') {
			// Center horizontally
			menuList.style.left = `${buttonRect.left + (buttonRect.width - menuRect.width) / 2}px`;
		} else if (anchor === 'left' || anchor === 'right') {
			// Center vertically
			menuList.style.top = `${buttonRect.top + buttonRect.height / 2}px`;
			menuList.style.transform = 'translateY(-50%)';
			if (anchor === 'left') {
				menuList.style.left = `${buttonRect.right + 4}px`;
			} else {
				menuList.style.left = `${buttonRect.left - menuRect.width - 4}px`;
			}
		}

		// Scroll to selected item
		if (targetItem) {
			setTimeout(() => {
				menuList.scrollTop = targetItem.offsetTop;
			}, 0);
		}
	}

	// New helper function for MacOS blink effect
	function handleMacOSBlink(event: Event) {
		const target = event.target as HTMLElement;
		const blinkCount = 4;
		const interval = 70;

		for (let i = 0; i < blinkCount; i++) {
			setTimeout(() => {
				target.classList.toggle('blink');
			}, i * interval);
		}

		setTimeout(
			() => {
				menuList.classList.add('hidden');
				menuButton.classList.remove('selected');
			},
			interval * blinkCount + 40
		);
	}

	function resetMenuProperties() {
		menuList.style.height = 'auto';
		menuList.style.maxHeight = '';
		menuList.style.top = '0px';
		menuList.style.bottom = '';
	}

	$: iconProps = getIconProps({ ...$$props, color: 'black3' });
</script>

<div
	use:clickOutside={closeMenu}
	on:change
	on:focus
	on:blur
	bind:this={menuWrapper}
	{placeholder}
	class="wrapper {className}"
>
	<button bind:this={menuButton} on:click={menuClick} {disabled} class:bordered={border}>
		{#if iconProps}
			<Icon {...iconProps} />
		{/if}

		{#if value}
			<Text class="selected-value">{value.label}</Text>
		{:else}
			<Text emphasis="tertiary" class="placeholder">{placeholder}</Text>
		{/if}

		{#if !disabled}
			<div class="caret">
				<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M3.64645 5.35359L0.646454 2.35359L1.35356 1.64648L4.00001 4.29293L6.64645 1.64648L7.35356 2.35359L4.35356 5.35359L4.00001 5.70714L3.64645 5.35359Z"
						fill="black"
					/>
				</svg>
			</div>
		{/if}
	</button>

	<ul class="menu hidden" bind:this={menuList}>
		{#if menuItems && menuItems.length > 0}
			{#each menuItems as item, i}
				{#if i === 0}
					{#if item.group && showGroupLabels}
						<SelectDivider label>{item.group}</SelectDivider>
					{/if}
				{:else if i > 0 && item.group && menuItems[i - 1].group != item.group}
					{#if showGroupLabels}
						<SelectDivider />
						<SelectDivider label>{item.group}</SelectDivider>
					{:else}
						<SelectDivider />
					{/if}
				{/if}
				<SelectItem
					on:click={menuClick}
					on:mouseenter={removeHighlight}
					itemId={item.id ?? 0}
					bind:selected={item.selected}>{item.label}</SelectItem
				>
			{/each}
		{/if}
	</ul>
</div>

<style lang="scss">
	.wrapper {
		position: relative;
	}

	.hidden {
		display: none;
	}

	button {
		display: flex;
		align-items: center;
		border: 1px solid transparent;
		height: 30px;
		width: 100%;
		margin: 1px 0 1px 0;
		padding: 4px var(--spacer-2) 0px var(--spacer-2);
		overflow-y: hidden;
		border-radius: var(--radius-medium);
		background-color: var(--color-bg);

		&.bordered {
			border-color: var(--figma-color-border);
		}
	}
	button:hover,
	button:active {
		border-color: var(--figma-color-border-onselected-strong);
	}
	button:hover .placeholder {
		color: var(--color-text);
	}
	button:hover .caret svg path,
	button:focus .caret svg path {
		fill: var(--color-text);
	}
	button:hover .caret,
	button:focus .caret {
		margin-left: auto;
	}
	button:focus {
		border: 1px solid var(--figma-color-bg-brand);
		outline: 1px solid var(--figma-color-bg-brand);
		outline-offset: -2px;
		padding-left: calc(var(--spacer-2) + 1px);
	}
	button:focus .placeholder {
		color: var(--color-text);
	}
	button:disabled .selected-value {
		color: var(--figma-color-text-secondary);
	}
	button:disabled:hover {
		justify-content: flex-start;
		border-color: transparent;
	}
	button:disabled:hover .placeholder {
		color: var(--figma-color-text-secondary);
	}
	button:disabled:hover .caret svg path {
		fill: var(--figma-color-text-secondary);
	}
	button * {
		pointer-events: none;
	}

	.selected-value,
	.placeholder {
		display: inline-block;
		font-size: var(--text-body-medium-font-size);
		font-weight: var(--font-weight-default);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		line-height: var(--line-height);
		color: var(--color-text);
		margin-right: var(--spacer-2);
		margin-top: -3px;
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: ellipsis;
		text-transform: lowercase;
	}

	.placeholder {
		color: var(--figma-color-text-tertiary);
	}

	.caret {
		display: block;
		margin-top: -1px;
		margin-left: auto;
	}

	.caret svg path {
		fill: var(--figma-color-icon-tertiary);
	}

	.icon {
		margin-left: -8px;
		margin-top: -2px;
		margin-right: 0;
	}

	.menu {
		position: fixed;
		width: max-content;
		min-width: auto;
		max-width: max(400px, 90vw);
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
		z-index: 2147483647;
		text-transform: lowercase;
	}
	.menu::-webkit-scrollbar {
		width: 12px;
		background-color: transparent;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);
		background-repeat: repeat;
		background-size: 100% auto;
	}
	.menu::-webkit-scrollbar-track {
		border: solid 3px transparent;
		-webkit-box-shadow: inset 0 0 10px 10px transparent;
		box-shadow: inset 0 0 10px 10px transparent;
	}
	.menu::-webkit-scrollbar-thumb {
		border: solid 3px transparent;
		border-radius: 6px;
		-webkit-box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
		box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
	}
</style>
