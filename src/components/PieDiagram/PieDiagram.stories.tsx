import React from 'react';
import { Meta, Story } from '@storybook/react';
import {PieDiagram, PieProps} from './PieDiagram'

const meta: Meta = {
    title: 'Pie Diagram',
    component: PieDiagram,
    parameters: {
      controls: { expanded: true },
    },
  };

  export default meta;

  
  const Pie: Story<PieProps> = args => <PieDiagram />;
  
  export const Diagram = Pie.bind({});
  
  

