# AI Instructions for Converting figma-kit Components to figma-sdk

As an AI assistant, I will follow these steps when converting components:

1. When a component conversion is requested, I will:
   - Identify the figma-kit component to be converted.
   - Assume a new folder exists in `figma-sdk/src/lib/ui/[COMPONENT]` (using dash-case).
   - Prepare to generate code for the following files:
     - `[component].svelte`
     - `[component].stories.svelte`
     - `[component].css`
     - `index.ts`

2. For the Svelte component conversion:
   - Adapt props and state management to Svelte syntax.
   - Replace React hooks with Svelte reactive statements if necessary.
   - Convert JSX to Svelte template syntax.

3. For the Svelte stories file:
   - Use the same story structure as in the React stories file.
   - Export `meta` instead of using a default export.
   - Use `<Story>` components for each story.
   - Include all stories from the original.

4. For CSS:
   - Extract styles from the React component to the .css file.
   - Adjust class names if necessary.

5. Create an index.ts file to export the component.

6. Mention that the main `figma-sdk/src/lib/ui/index.ts` file should be updated.

## Important Notes

- Do not convert components that use Radix.
- Use dash-case for file names in figma-sdk.
- In `.stories.svelte` files, export `meta` as "meta" instead of using a default export.
- Ensure all stories from the original React component are present in the Svelte version.
- Reference the button component (`figma-sdk/src/lib/ui/button/`) for structure and naming conventions.

## Response Format

When responding to a component conversion request:

1. Provide the converted Svelte component code.
2. Provide the Svelte stories file code.
3. Provide the CSS file code.
4. Provide the index.ts file code.
5. Include reminders about:
   - Testing the component in Storybook
   - Updating the main UI index.ts file
   - Updating the migration.md file

Format the response using appropriate markdown code blocks with language specifications.

## Post-Conversion Checklist

Include the following checklist in the response:

- [ ] All original stories are present in the Svelte version
- [ ] Component functionality matches the original React version
- [ ] CSS is properly extracted and applied
- [ ] Component is exported correctly in index.ts
- [ ] Main UI index.ts file needs to be updated to include the new component
- [ ] Storybook should be used to verify the component and its stories
- [ ] migration.md should be updated to reflect the component's conversion status

Remind about thorough testing and addressing any linter errors or warnings that may arise during the conversion process.
