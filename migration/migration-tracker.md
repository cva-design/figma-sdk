# Figma-kit to Figma-sdk Migration Tracker

## Components List

### Alert Dialog

Properties:

- Root: RadixAlertDialog.AlertDialogProps
- Trigger: RadixAlertDialog.AlertDialogTriggerProps
- Content: RadixAlertDialog.AlertDialogContentProps & VariantProps<typeof content>
- Overlay: RadixAlertDialog.AlertDialogOverlayProps
- Title: RadixAlertDialog.AlertDialogTitleProps
- Description: RadixAlertDialog.AlertDialogDescriptionProps
- Actions: React.ComponentPropsWithoutRef<'div'>
- Cancel: RadixAlertDialog.AlertDialogCancelProps
- Action: RadixAlertDialog.AlertDialogActionProps

Stories:

- Story

External libraries: @radix-ui/react-alert-dialog

### Button

Status: Migrated and Tested

Properties:

- variant: 'primary' | 'secondary' | 'inverse' | 'destructive' | 'success' | 'text'
- size: 'small' | 'medium'
- fullWidth: boolean

Stories:

- Primary
- Secondary
- Destructive
- Success
- Inverse
- Text

External libraries: class-variance-authority

### Checkbox

Properties:

- checked: boolean
- disabled: boolean
- indeterminate: boolean
- label: string

Stories:

- WithLabel
- WithoutLabel
- Indeterminate
- Disabled
- DisabledChecked
- DisabledIndeterminate
- MultiLineLabel
- Description

External libraries: None

### Collapsible

Properties:

- Root: RadixCollapsible.CollapsibleProps
- Trigger: RadixCollapsible.CollapsibleTriggerProps
- Content: RadixCollapsible.CollapsibleContentProps

Stories:

- Story
- Nesting

External libraries: @radix-ui/react-collapsible

### Color Picker

Properties:

- colorSpace: 'srgb' | 'display-p3'
- defaultActiveModel: ColorModel
- activeModel: ColorModel
- onActiveModelChange: (model: ColorModel) => void
- models: ColorModel[]
- defaultColor: RGBA
- color: RGBA
- onColorChange: (color: RGBA) => void

Stories:

- Story

External libraries: None

### Context Menu

Properties:

- Root: RadixContextMenu.ContextMenuProps
- Trigger: RadixContextMenu.ContextMenuTriggerProps
- Content: RadixContextMenu.ContextMenuContentProps
- Item: RadixContextMenu.ContextMenuItemProps
- CheckboxItem: RadixContextMenu.ContextMenuCheckboxItemProps
- RadioGroup: RadixContextMenu.ContextMenuRadioGroupProps
- RadioItem: RadixContextMenu.ContextMenuRadioItemProps
- Sub: RadixContextMenu.ContextMenuSubProps
- SubTrigger: RadixContextMenu.ContextMenuSubTriggerProps
- SubContent: RadixContextMenu.ContextMenuSubContentProps
- Separator: RadixContextMenu.ContextMenuSeparatorProps
- Label: RadixContextMenu.ContextMenuLabelProps

Stories:

- Simple
- WithCheckboxes

External libraries: @radix-ui/react-context-menu

### Icon

Properties:

- name: string
- color: string
- size: number
- spin: boolean

Stories:

- Default
- Custom Color
- Custom Size
- Spinning
- Multiple Icons

External libraries: None

### Tooltip

Properties:

- content: string
- position: 'top' | 'right' | 'bottom' | 'left'

Stories:

- Default
- Top Position
- Right Position
- Bottom Position
- Left Position
- Custom Content

External libraries: None

### Input

Properties:

- type: 'text' | 'password' | 'email' | 'number'
- placeholder: string
- value: string
- onChange: (value: string) => void
- disabled: boolean
- error: boolean
- errorMessage: string

Stories:

- Default
- With Placeholder
- Disabled
- With Error

External libraries: None

### Select

Properties:

- options: Array<{ value: string, label: string }>
- value: string
- onChange: (value: string) => void
- placeholder: string
- disabled: boolean

Stories:

- Default
- With Placeholder
- Disabled
- Multiple Selection

External libraries: None

### Modal

Properties:

- isOpen: boolean
- onClose: () => void
- title: string
- children: React.ReactNode

Stories:

- Default
- With Custom Content
- With Form

External libraries: None

### Tabs

Properties:

- Root: RadixTabs.TabsProps
- List: RadixTabs.TabsListProps
- Trigger: RadixTabs.TabsTriggerProps
- Content: RadixTabs.TabsContentProps

Stories:

- Default
- Vertical Layout
- With Icons

External libraries: @radix-ui/react-tabs

### Toggle

Properties:

- checked: boolean
- onChange: (checked: boolean) => void
- disabled: boolean
- label: string

Stories:

- Default
- With Label
- Disabled

External libraries: None

### Slider

Properties:

- min: number
- max: number
- step: number
- value: number
- onChange: (value: number) => void

Stories:

- Default
- With Custom Range
- With Labels

External libraries: None

### Progress

Properties:

- value: number
- max: number
- showLabel: boolean

Stories:

- Default
- With Label
- Indeterminate

External libraries: None

## Notes

- Components using Radix should be skipped for now
- Update this file as new components are identified and migrated
- Ensure all properties and stories are accounted for in the Svelte version
- Pay attention to accessibility features when migrating components
- Consider creating a shared types file for common prop types (e.g., sizes, variants)
- Document any major differences between the React and Svelte implementations
- Test each migrated component thoroughly, including edge cases
- Update storybook documentation for each migrated component
- Consider creating a migration guide for users of the old Figma-kit
