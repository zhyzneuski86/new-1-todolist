import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";

export type FilterValueType = "all" | "active" | "completed"

function App() {
    const todoTitle_1: string = "What to learn"

    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "React", isDone: false},
            {id: 4, title: "Redux", isDone: false},
            {id: 5, title: "Angular", isDone: false}
        ]
    )


    const removeTask = (taskId: number) => {
        const filteredTasks = (tasks.filter(task => task.id !== taskId))
        setTasks(filteredTasks)
    }

    const [filter, setfilter] = useState<FilterValueType>("all")

    const changeTodoListFilter = (filter: FilterValueType)=>{
        setfilter(filter)
    }

    let tasksForTodoList: Array<TaskType> = []
    if (filter === "all") {
        tasksForTodoList = tasks
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <TodoList
                title={todoTitle_1}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
            />
        </div>
    );
}

export default App;
