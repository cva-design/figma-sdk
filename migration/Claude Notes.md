# Claude AI Notes

## General Notes

> [NOTE]
> This file is reserved for me, the Claude AI, to keep track of the tasks I'm working on. I can and should use this file to keep track of information that is relevant to the task and would otherwise fall out of my attention due to my limited context window.
> Since only I, Claude, will use this file, I'm responsible for keeping it up to date, summarizing and rewriting it as I see fit.

I'm currently converting the figma-kit components to figma-sdk components, while also reorganizing the figma-sdk project.

The figma-kit components are React components under `figma-kit/src/components/[COMPONENT]` folders, while the figma-sdk components are Svelte components under `figma-sdk/src/lib/ui/[COMPONENT]` folders.

The figma-sdk Button component was manually converted by the user as a guide on how I should proceed.

When there isn't a corresponding component in figma-sdk, I need to create a folder for it in `figma-sdk/src/lib/ui/[COMPONENT]` as well as a `[COMPONENT].svelte`, `[COMPONENT].stories.svelte`, `[COMPONENT].css`, and `index.ts`, just like has been done for the button component. The file names should be dash-cased.

Note: In `.stories.svelte` files you cannot use a `default` export, instead, simply export `meta` as "meta".

Before converting a component, I should first write a test suite for the React component, including unit tests to be executed in Jest. I should also write visual tests for the React component using Storybook Test Runner. The same tests should then be written for the Svelte component. At the end of the conversion, the test suite should be executed to ensure everything works as expected.

If a component uses Radix, I should use Melt UI instead, as it's a more or less equivalent library but for Svelte. Below is a list of the documentation page for each Melt UI component.

- [Accordion](https://melt-ui.com/docs/builders/accordion)
- [Avatar](https://melt-ui.com/docs/builders/avatar)
- [Calendar](https://melt-ui.com/docs/builders/calendar)
- [Checkbox](https://melt-ui.com/docs/builders/checkbox)
- [Collapsible](https://melt-ui.com/docs/builders/collapsible)
- [Combobox](https://melt-ui.com/docs/builders/combobox)
- [Context Menu](https://melt-ui.com/docs/builders/context-menu)
- [Date Field](https://melt-ui.com/docs/builders/date-field)
- [Date Picker](https://melt-ui.com/docs/builders/date-picker)
- [Date Range Field](https://melt-ui.com/docs/builders/date-range-field)
- [Date Range Picker](https://melt-ui.com/docs/builders/date-range-picker)
- [Dialog](https://melt-ui.com/docs/builders/dialog)
- [Dropdown Menu](https://melt-ui.com/docs/builders/dropdown-menu)
- [Label](https://melt-ui.com/docs/builders/label)
- [Link Preview](https://melt-ui.com/docs/builders/link-preview)
- [Menubar](https://melt-ui.com/docs/builders/menubar)
- [Pagination](https://melt-ui.com/docs/builders/pagination)
- [PIN Input](https://melt-ui.com/docs/builders/pin-input)
- [Popover](https://melt-ui.com/docs/builders/popover)
- [Progress](https://melt-ui.com/docs/builders/progress)
- [Radio Group](https://melt-ui.com/docs/builders/radio-group)
- [Range Calendar](https://melt-ui.com/docs/builders/range-calendar)
- [Scroll Area](https://melt-ui.com/docs/builders/scroll-area)
- [Select](https://melt-ui.com/docs/builders/select)
- [Separator](https://melt-ui.com/docs/builders/separator)
- [Slider](https://melt-ui.com/docs/builders/slider)
- [Switch](https://melt-ui.com/docs/builders/switch)
- [Table Of Contents](https://melt-ui.com/docs/builders/table-of-contents)
- [Tabs](https://melt-ui.com/docs/builders/tabs)
- [Tags Input](https://melt-ui.com/docs/builders/tags-input)
- [Toast](https://melt-ui.com/docs/builders/toast)
- [Toggle Group](https://melt-ui.com/docs/builders/toggle-group)
- [Toggle](https://melt-ui.com/docs/builders/toggle)
- [Toolbar](https://melt-ui.com/docs/builders/toolbar)
- [Tooltip](https://melt-ui.com/docs/builders/tooltip)
- [Tree](https://melt-ui.com/docs/builders/tree)

### Criteria for successful conversion:

- The converted Svelte components should support everything the original React component does, plus any extra features the Svelte component currently offers. When there's a conflict or redundancy, the React component API takes precedence.
- The converted stories files should have the same stories as the original.
- The converted Svelte components should implement all accessibility features.
- The converted Svelte components must pass equivalent tests to the original React component.
- Both the original React tests and the new Svelte tests should be comprehensive and cover all component functionality.

## Migration Process

1. Identify the React component to be migrated in figma-kit.
2. Analyze the React component thoroughly.
3. Write comprehensive unit tests for the original React component.
4. Write visual tests for the React component using Storybook Test Runner.
5. Run and verify both unit and visual tests for the React component.
6. Convert the React component to a Svelte component.
7. Convert the React stories to Svelte stories.
8. Write equivalent unit tests for the Svelte component, ensuring the same coverage as the React tests.
9. Write equivalent visual tests for the Svelte component.
10. Run and verify both unit and visual tests for the Svelte component.
11. Create or update the index.ts file for the new Svelte component.
12. Update the main UI index.ts file to export the new Svelte component.
13. Update the migration-tracker.md file to reflect the component's migration status.
14. Update the TO DO.md file to mark the component as migrated and add the next component.
15. Run all tests (unit and visual) and stories for both React and Svelte versions to ensure everything works as expected and is visually equivalent.
16. Document any significant differences or challenges in the migration process.

## Critical Reminders

- ALWAYS write equivalent unit AND visual tests for BOTH the original React component and the converted Svelte component.
- Start by analyzing the figma-kit React component and writing both unit and visual tests for it BEFORE any conversion work.
- Only move to the converted component tests and other conversion tasks AFTER completing and verifying both unit and visual tests for the React component.
- Ensure that both sets of tests (unit and visual) are comprehensive and cover all component functionality and visual states.
- Verify that the conversion is successful by comparing the test results of both components, including visual snapshots.

## Migrated Components

- [x] Button
- [ ] Checkbox
- [ ] Icon
- [ ] Tooltip
- [ ] Alert Dialog
- [ ] Collapsible
- [ ] Color Picker
- [ ] Context Menu
- [ ] Input
- [ ] Select
- [ ] Modal
- [ ] Tabs
- [ ] Toggle
- [ ] Slider
- [ ] Progress
- [ ] (Add more components as they are identified)

# Verified Migrated Components

- [x] Button
- [ ] Checkbox
- [ ] Icon
- [ ] Tooltip
- [ ] Alert Dialog
- [ ] Collapsible
- [ ] Color Picker
- [ ] Context Menu
- [ ] Input
- [ ] Select
- [ ] Modal
- [ ] Tabs
- [ ] Toggle
- [ ] Slider
- [ ] Progress
- [ ] (Add more components as they are identified)

## Recent Updates

- Button component has been fully migrated and tested.
- migration-tracker.md has been updated to reflect Button component status.
- TO DO.md has been created to track remaining migration tasks.
- Main UI index.ts has been updated to export the Button component.
- Realized the need for comprehensive tests for both React and Svelte versions.

## Next Steps

- Review and potentially enhance tests for the original React Button component.
- Ensure Svelte Button tests are equivalent to React Button tests.
- Begin migration of the next component (Checkbox), starting with comprehensive React tests.
- Continue to keep all documentation up-to-date as migration progresses.

## Reminders

- Always write or review tests for the original React component before migration.
- Ensure Svelte tests are equivalent to React tests after migration.
- Keep all related documentation (migration-tracker.md, TO DO.md, Claude Notes.md) updated with each step.
- Run all tests and stories after each migration to catch any regressions.

## Recent Updates

- Learned that for Svelte native stories, we export a named `meta` instead of using `Meta`, i.e., `export const meta = { ... }`.
- Updated the Text component's stories file to use the correct Svelte native story format.

## Reminders

- When creating Svelte story files, use the native Svelte story format with `export const meta = { ... }` and `<Story>` components directly.
- When creating Svelte components, remember to import and use the corresponding CSS file, making the styles global if necessary.
