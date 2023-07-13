import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {TaskWithRedux} from "../TaskWithRedux";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // args: {
    //     task: {},
    //     todolistId: 'dd'
    // },
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const TaskWithReduxWrap = () => {
    const todolistID = 'todolistId1'
    const task = useSelector <AppRootStateType, TaskType>(state => state.tasks[todolistID][0])

    return <TaskWithRedux task={task} todolistId={todolistID}/>
}


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskWithReduxStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    render: () => <TaskWithReduxWrap/>}

