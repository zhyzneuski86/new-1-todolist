import React, {FC} from 'react';
import {FilterValueType} from "./App";

type TodoListType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=>void
    changeTodoListFilter: (value: FilterValueType)=>void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean

}

export const TodoList: FC<TodoListType> = (props) => {

    const todolistItems:  Array<JSX.Element> = props.tasks.map((task) => {
        return (
        <li>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={()=>{props.removeTask(task.id) }}>x</button>
        </li>)
    })

    return  (
    <div className="todoList">
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {todolistItems}
        </ul>
        <div>
            <button onClick={()=>{props.changeTodoListFilter('all')}}>All</button>
            <button onClick={()=>{props.changeTodoListFilter("active")}}>Active</button>
            <button onClick={()=>{props.changeTodoListFilter("completed")}}>Completed</button>
        </div>
    </div>
    )
}


