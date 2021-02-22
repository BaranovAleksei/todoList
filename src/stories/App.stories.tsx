import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { action } from '@storybook/addon-actions'
import App from "../App";
import {ReduxStoreProviderDecorator} from "./Decorators/ReduxStoreProviderDecorator";

export default {
  title: 'App Stories',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
}

export const AppBaseExample = ( props: any) => {
  return (
    <App/>
  )
}