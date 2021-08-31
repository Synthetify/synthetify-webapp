import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Label } from './Label';

const meta: Meta = {
  title: 'Pie Diargam Label',
  component: Label,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const DiagramLabel: Story = args => <Label  />;


export const PieDiargamLabel = DiagramLabel.bind({});