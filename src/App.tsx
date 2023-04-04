import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"


function App() {
    const todoTitle_1: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Angular", isDone: false}
        ]
    )


    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskId: string) => {
        const filteredTasks = (tasks.filter(task => task.id !== taskId))
        setTasks(filteredTasks)
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const [filter, setfilter] = useState<FilterValueType>("all")

    const changeTodoListFilter = (filter: FilterValueType) => {
        setfilter(filter)
    }


    const getFilteredTaskForRender = (tasksList: Array<TaskType>, filterValue: FilterValueType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => t.isDone === false)
            case "completed":
                return tasksList.filter(t => t.isDone === true)
            default:
                return tasksList
        }
    }
    const tasksForTodoList: Array<TaskType> = getFilteredTaskForRender(tasks, filter)
    return (
        <div className="App">
            <TodoList
                title={todoTitle_1}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
