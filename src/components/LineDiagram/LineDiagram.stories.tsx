import React from 'react';
import { Meta, Story } from '@storybook/react';
import  { LineDiagram, Props } from '../src/LineDiagram';

const meta: Meta = {
  title: 'Line Diagram',
  component: LineDiagram,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Line: Story<Props> = args => <LineDiagram  />;


export const LineDiagramView = Line.bind({});




