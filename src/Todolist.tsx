import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

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
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.todoListId, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const onAllClickHandler = () => props.changeFilter(props.todoListId, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todoListId, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todoListId, "completed");
    const removeTodoListHandler = () => {
    props.removeTodoList(props.todoListId)
    }

    return <div>
        <h3>
            {props.title}
            <button onClick={removeTodoListHandler}
            >x
        </button>
    </h3>
    <div>
        <input value={title}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
    </div>
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
                    <span>{t.title}</span>
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
