import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Card, Props } from './Card';

const meta: Meta = {
  title: 'Cards',
  component: Card,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Cards: Story<Props> = args => <Card {...args} />;


export const Volument = Cards.bind({});
export const Debt = Cards.bind({});
export const Fee = Cards.bind({});
export const Mint = Cards.bind({});
export const Burn = Cards.bind({});

Volument.args = {
    content:"Volument",
    value:450456
}
Debt.args = {
    content:"Debt",
    value:4456
}
Fee.args = {
    content:"Fee",
    value:1450456
}
Mint.args = {
    content:"Mint",
    value:450
}
Burn.args = {
    content:"Burn",
    value:45456
}
