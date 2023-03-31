import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType} from "./App";

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (value: FilterValueType) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList: FC<TodoListType> = (props) => {

    let [title, setTitle] = useState<string>('')


    const todolistItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => {
            props.removeTask(task.id)
        }
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>)
    })
    const maxTitleLength = 20
    const recommendedTitleLength = 10

    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: 'white'}}>Title should be shorter </div>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{color: 'red'}}>Title is too long </div>
    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="Enter task tittle, please"
                    value={title}
                    onChange={setLocalTitle}
                    onKeyDown={onKeyDownTaskHandler}
                />
                {/*//e.currentTarget === input*/}
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeTodoListFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeTodoListFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}


