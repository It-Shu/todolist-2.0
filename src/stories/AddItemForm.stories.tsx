import React from 'react';
import {ComponentStory, ComponentMeta, Story, Meta} from '@storybook/react';

import {AddItemForm, AddItemFormType} from "../components/addItem-form/AddItemForm";
import {action} from "@storybook/addon-actions";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as Meta;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<AddItemFormType> = (args) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
};
