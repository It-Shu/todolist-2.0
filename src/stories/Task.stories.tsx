import React from 'react';
import {ComponentStory, ComponentMeta, Story, Meta} from '@storybook/react';

import {AddItemFormType} from "../components/addItem-form/AddItemForm";
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "../components/Task/Task";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    // argTypes: {
    //     backgroundColor: {control: 'color'},
    // },
} as Meta;


const changeTaskStatusCallback = action('Status changed inside task')
const changeTaskTitleCallback = action('Title changed inside task')
const removeTaskCallback = action('remove button clicked inside task')

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
};

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', title: 'JS', isDone: false},
    todolistId: 'todolistId1'
};
