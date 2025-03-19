<script lang="ts">
	import { clickOutside } from '#actions/click-outside';
	import { getIconProps, Icon, Text, type IconProps } from '#ui';
	import { createEventDispatcher, onMount } from 'svelte';
	import SelectDivider from './select-divider.svelte';
	import SelectItem, { type SelectEventDetail } from './select-item.svelte';
	import type { SelectMenuItem } from './types';

	type $$Props = Partial<IconProps> & {
		id?: string;
		border?: boolean;
		disabled?: boolean;
		macOSBlink?: boolean;
		menuItems?: SelectMenuItem[];
		placeholder?: string;
		value?: SelectMenuItem | null;
		showGroupLabels?: boolean;
		table?: boolean;
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
	const table: $$Props['table'] = $$props.table ?? false;

	const dispatch = createEventDispatcher();

	const groups = checkGroups();
	let menuWrapper: HTMLDivElement, menuButton: HTMLButtonElement, menuList: HTMLUListElement;
	$: updateSelectedAndIds();

	// Handle item selection from SelectItem component
	function handleSelect(event: CustomEvent<SelectEventDetail>) {
		const itemId = Number(event.detail.itemId);
		if (!menuItems[itemId]) return; // Guard against invalid itemId

		if (value?.id !== undefined && menuItems[value.id]) {
			menuItems[value.id].selected = false;
		}

		menuItems[itemId].selected = true;
		value = menuItems[itemId];
		updateSelectedAndIds();
		dispatch('change', menuItems[itemId]);

		if (macOSBlink) {
			handleMacOSBlink();
		} else {
			menuList.classList.add('hidden');
			menuButton.classList.remove('selected');
		}
	}

	//FUNCTIONS

	//assign id's to the input array
	onMount(async () => {
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
		menuList.style.top = '';
		menuList.style.bottom = '';
	}

	// Run for all menu click events
	// This opens/closes the menu
	async function menuClick(event: Event) {
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
					await positionMenu(targetItem);
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
				handleMacOSBlink();
			} else {
				menuList.classList.add('hidden');
				menuButton.classList.remove('selected');
			}
		}
	}

	// New helper function to calculate menu height
	function calculateMenuHeight() {
		// Wait for next tick to ensure DOM is updated
		return new Promise<number>((resolve) => {
			setTimeout(() => {
				const menuItem = menuList.querySelector('.select-item') as HTMLElement; // Get first menu item
				const divider = menuList.querySelector('.select-divider') as HTMLElement; // Get first divider
				if (!menuItem) return resolve(0);

				const itemHeight = menuItem.offsetHeight;
				const dividerHeight = divider ? divider.offsetHeight : itemHeight * 0.5;
				const paddingSpace = 16; // Account for padding (8px top + 8px bottom)
				const maxVisibleItems = 7;

				// Count total visible items including dividers
				if (showGroupLabels && groupedItems) {
					const numDividers = groupOrder.filter((g) => g !== 'ungrouped').length;
					const totalHeight =
						itemHeight * maxVisibleItems + dividerHeight * numDividers + paddingSpace;
					resolve(totalHeight);
				} else {
					resolve(itemHeight * maxVisibleItems + paddingSpace);
				}
			}, 0);
		});
	}

	async function positionMenu(targetItem: HTMLElement) {
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
		menuList.style.transform = '';

		const maxMenuHeight = await calculateMenuHeight();

		// Handle vertical positioning with the new maxHeight
		if (anchor.includes('top') || anchor === 'top') {
			menuList.style.top = `${buttonRect.top - Math.min(maxMenuHeight, menuRect.height) - 4}px`;
			menuList.style.maxHeight = `${Math.min(maxMenuHeight, spaceAbove - 10)}px`;
		} else if (anchor.includes('bottom') || anchor === 'bottom') {
			menuList.style.top = `${buttonRect.bottom + 4}px`;
			menuList.style.maxHeight = `${Math.min(maxMenuHeight, spaceBelow - 10)}px`;
		} else {
			menuList.style.maxHeight = `${maxMenuHeight}px`;
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
				// First reset the scroll
				menuList.scrollTop = 0;

				// Only scroll to selected item if it's not visible
				const targetOffset = targetItem.offsetTop;
				const menuHeight = menuList.clientHeight;

				if (targetOffset > menuHeight) {
					menuList.scrollTop = targetOffset - menuHeight / 2;
				}
			}, 0);
		}
	}

	// New helper function for MacOS blink effect
	function handleMacOSBlink() {
		const selectedItem = menuList.querySelector(`[itemid="${value?.id}"]`) as HTMLElement;
		if (!selectedItem) return;

		const blinkCount = 4;
		const interval = 70;

		for (let i = 0; i < blinkCount; i++) {
			setTimeout(() => {
				selectedItem.classList.toggle('blink');
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
		menuList.style.bottom = '';
	}

	// Helper function to organize items by groups while maintaining order
	function getGroupedItems() {
		const groupedItems: Record<string, SelectMenuItem[]> = {};
		const groupOrder: string[] = [];
		let hasGroups = false;

		for (const item of menuItems) {
			if (item.group) hasGroups = true;
			const group = item.group || 'ungrouped';
			if (!groupedItems[group]) {
				groupedItems[group] = [];
				groupOrder.push(group);
			}
			groupedItems[group].push(item);
		}

		return hasGroups ? { groupedItems, groupOrder } : { ungrouped: menuItems };
	}

	$: ({ groupedItems, groupOrder = ['ungrouped'] } = getGroupedItems());
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
	<button
		bind:this={menuButton}
		on:click={menuClick}
		{disabled}
		class:bordered={border}
		class:table-select={table}
	>
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
			{#if !groupedItems}
				{#each menuItems as item}
          {@const iconProps = getIconProps(item)}
					<SelectItem
						on:select={handleSelect}
						on:mouseenter={removeHighlight}
						itemId={item.id ?? 0}
						bind:selected={item.selected}
						class="select-item"
					>
            {#if iconProps}
              <Icon surface="menu" {...iconProps} />
            {/if}
						{item.label}
					</SelectItem>
				{/each}
			{:else}
				{#each groupOrder as group}
					{#if group !== 'ungrouped' && showGroupLabels}
						<SelectDivider groupLabel>{groupedItems[group][0].groupLabel}</SelectDivider>
					{/if}
					{#each groupedItems[group] as item}
            {@const iconProps = getIconProps(item)}
						<SelectItem
							on:select={handleSelect}
							on:mouseenter={removeHighlight}
							itemId={item.id ?? 0}
							bind:selected={item.selected}
							class="select-item"
						>
              <div class="select-item-content">
                {#if iconProps}
                  <Icon surface="menu" {...iconProps} />
                {/if}
                {item.label}
              </div>
						</SelectItem>
					{/each}
				{/each}
			{/if}
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
		width: 100%;
		margin: 1px 0 1px 0;
		padding: var(--spacer-2);
		overflow-y: hidden;
		border-radius: var(--radius-medium);
		background-color: var(--figma-color-bg);

		&.bordered {
			border-color: var(--figma-color-border);
		}
		&:not(.table-select) {
			height: var(--spacer-4);
		}
	}
	button:hover,
	button:active,
	button:focus {
		&:not(.table-select) {
			border-color: var(--figma-color-border-onselected-strong);
			&:focus {
				border: 1px solid var(--figma-color-bg-brand);
				outline: 1px solid var(--figma-color-bg-brand);
				outline-offset: -2px;
				padding-left: calc(var(--spacer-2) + 1px);
			}
		}
	}
	button:hover .placeholder {
		color: var(--figma-color-text);
	}
	button:hover .caret svg path,
	button:focus .caret svg path {
		fill: var(--figma-color-text);
	}
	button:hover .caret,
	button:focus .caret {
		margin-left: auto;
	}

	button:focus .placeholder {
		color: var(--figma-color-text);
	}
	button:disabled .selected-value {
		color: var(--figma-color-text-secondary);
	}
	button:disabled:hover {
		justify-content: flex-start;
		border-color: transparent;

		&.bordered {
			border-color: var(--figma-color-border);
		}
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
		color: var(--figma-color-text);
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
		margin-left: auto;
		margin-top: 2px;
		padding-left: 10px;
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
		color: var(--figma-color-text-menu);
		box-shadow: var(--elevation-400);
		z-index: 2147483647;
		overflow-y: auto;
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.4) transparent; 

		:global(li) {
			list-style: none;
		}

		&::-webkit-scrollbar {
			width: 8px;
			background-color: transparent;
		}
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}
		&::-webkit-scrollbar-thumb {
			background-color: rgba(255, 255, 255, 0.4);
			border-radius: 4px;
			border: 2px solid transparent;
			background-clip: padding-box;
		}
	}

  .select-item-content {
    display: flex;
    flex-direction: row;
    align-items: start;
  }
</style>
