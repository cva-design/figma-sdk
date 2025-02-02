<script lang="ts">
  import { Meta, Story } from '@storybook/addon-svelte-csf';
  import Alert from './alert.svelte';
  import type { AlertProps } from './types';
</script>

<Meta
  title="Alert"
  component={Alert}
  argTypes={{
    text: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'hint']
    }
  }}
/>

<Story
  name="Success"
  args={{
    text: 'This is a success message',
    type: 'success',
  }}
>
  <Alert text="This is a success message" type="success" />
</Story>

<Story
  name="Warning"
  args={{
    text: 'This is a warning message',
    type: 'warning',
  }}
>
  <Alert text="This is a warning message" type="warning" />
</Story>

<Story
  name="Error"
  args={{
    text: 'This is an error message',
    type: 'error',
  }}
>
  <Alert text="This is an error message" type="error" />
</Story>

<Story
  name="Hint"
  args={{
    text: 'This is a hint message',
    type: 'hint',
  }}
>
  <Alert text="This is a hint message" type="hint" />
</Story> 
