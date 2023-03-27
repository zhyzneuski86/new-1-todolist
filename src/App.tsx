import React from 'react';
import './App.css';
import {TaskType, TodoList} from "./Todolist";

function App() {
    const todoTitle_1 = "What to learn"
    const todoTitle_2: string = "What to buy"

    const task_1: Array<TaskType>= [
        {id:1, title:"HTML&CSS", isDone: true},
        {id:2, title:"JS", isDone:true},
        {id:3, title:"React", isDone:false}
    ]
    const task_2: Array<TaskType>= [
        {id:4, title:"Bread", isDone: true},
        {id:5, title:"Water", isDone:false},
        {id:6, title:"Salt", isDone:false}
    ]


    return (
        <div className="App">
           <TodoList
               title={todoTitle_1}
               tasks={task_1}
           />
           <TodoList
               title={todoTitle_2}
               tasks={task_2}
           />

        </div>
    );
}

export default App;
