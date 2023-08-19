import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../components/Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'core/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    intent: { control: 'radio', defaultValue: 'none' },
    size: { defaultValue: 'lg' },
    icon: { defaultValue: undefined },
    disabled: { type: 'boolean', defaultValue: false },
    onClick: { type: 'function' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: 'Default',
  },
};

export const Success: Story = {
  args: {
    intent: 'success',
    children: 'Success',
  },
};

export const Warning: Story = {
  args: {
    intent: 'warning',
    children: 'Warning',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    intent: 'danger',
    children: 'Danger',
    size: 'lg',
  },
};
