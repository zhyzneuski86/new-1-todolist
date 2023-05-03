import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, taskId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string)=>void
    filter: FilterValuesType
    updateTask: (todoListId: string, taskId: string, updateTitle: string) => void
    updateTodoListTitle: (todoListId: string, updateTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todoListId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListId, "completed");
    const removeTodoListHandler = () => {
        // props.removeTodoList(props.todoListId)
        props.removeTodoList(props.todoListId)
    }


    const addTaskHandler = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const updateTaskHandler = (taskId: string, updateTitle: string) => {
        props.updateTask(props.todoListId, taskId, updateTitle)
    }

    const updateTodoListTitleHandler=(updateTitle: string)=>{
        props.updateTodoListTitle(props.todoListId, updateTitle)
    }

    return <div>
        <h3>
            {/*{props.title}*/}
            <EditableSpan oldTitle={props.title}
                          callBack={updateTodoListTitleHandler}/>
            <button onClick={removeTodoListHandler}
            > x
            </button>
        </h3>
        <AddItemForm callBack={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todoListId, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId);
                    }

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        {/*<span>{t.title}</span>*/}
                        <EditableSpan callBack={(updateTitle) => updateTaskHandler(t.id, updateTitle)}
                                      oldTitle={t.title}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
