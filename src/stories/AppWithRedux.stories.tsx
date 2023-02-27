import React from 'react';
import {Meta, Story} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story = () => <AppWithRedux/>;

export const AppWithReduxExample = Template.bind({});
