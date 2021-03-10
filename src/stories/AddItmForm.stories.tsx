import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { action } from '@storybook/addon-actions'
import {AddItemForm} from "../components/AddItemForm/AddItemForm";

export default {
  title: 'AddItemForm Stories',
  component: AddItemForm
}

export const AddItemFormBaseExample = ( props: any) => {
  return (<AddItemForm
    addItem={action('Button inside form cliked')}
  />)
}