import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task, TaskPropsType} from '../Task';
import {FC, useState} from "react";

// More on how to set up stories at: 
// https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry:
    // https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        changeTaskStatus: action('Status changed inside Task'),
        changeTaskTitle: action('Title changed inside Task'),
        removeTask: action('Remove Button clicked changed inside Task'),
        task: {id: '12wsdewfijdei', title: 'JS', isDone: true},
        todolistId: 'fgdosrg8rgjuh'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates:
// https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {};

export const TaskIsNotDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: '12wsdewfijdei2343', title: 'CSS', isDone: false},
    },
};

const TaskWithHook: FC<TaskPropsType> = (args) => {
    const [task, setTask] = useState(args.task)
    const changeTaskStatus = ()=>{
        setTask({...task, isDone: !task.isDone})
    }
    const changeTaskTitle = (taskId: string, title: string)=>{
        setTask({...task, title: title})
    }

    return <Task task={task} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}
                 removeTask={args.removeTask} todolistId={args.todolistId}/>
}
export const TaskWithHookStory: Story = {
    render: (args => <TaskWithHook task={args.task}
                                   changeTaskStatus={args.changeTaskStatus}
                                   changeTaskTitle={args.changeTaskTitle}
                                   removeTask={args.removeTask}
                                   todolistId={args.todolistId}/>)
}

