import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
console.log(v1())
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
           id: v1(), title:title, isDone: false
       }
        setTasks([newTask, ...tasks])
    }

    const removeTask = (taskId: string) => {
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
                addTask={addTask}
            />
        </div>
    );
}

export default App;
