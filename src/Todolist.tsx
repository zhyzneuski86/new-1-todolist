import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType} from "./App";
import {inflate} from "zlib";

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    changeTodoListFilter: (value: FilterValueType) => void
    filter: FilterValueType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

export const TodoList: FC<TodoListType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>( false)

    const todolistItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => {
            props.removeTask(task.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
        return (
            <li>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>)
    })
    const maxTitleLength = 20
    const recommendedTitleLength = 10

    const isAddTaskNotPossible = title.length === 0 || title.length > maxTitleLength || error

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    }
    const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTaskHandler()
    const longTitleWarningMessage = (title.length > recommendedTitleLength && title.length <= maxTitleLength) &&
        <div style={{color: 'white'}}>Title should be shorter </div>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{color: 'red'}}>Title is too long </div>

    const errorMessage = error &&  <div style={{color: 'red'}}>Title is hard required! </div>
    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="Enter task tittle, please"
                    value={title}
                    onChange={setLocalTitle}
                    onKeyDown={onKeyDownTaskHandler}
                    className={error? "input-error" : ''}
                />
                {/*//e.currentTarget === input*/}
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
                {errorMessage}
            </div>
            <ul>
                {todolistItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={() => {
                        props.changeTodoListFilter('all')
                    }}>All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={() => {
                        props.changeTodoListFilter("active")
                    }}>Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={() => {
                        props.changeTodoListFilter("completed")
                    }}>Completed
                </button>
            </div>
        </div>
    )
}


