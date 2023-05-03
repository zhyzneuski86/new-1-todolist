import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = { id: string, title: string, filter: FilterValuesType }
type AssocTaskType = {
    [key: string]: TaskType[]

}

function App() {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<AssocTaskType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    const removeTodoList = (todoListId: string) => {
        setTodolists(todolists.filter(el => el.id !== todoListId))
        delete tasks[todoListId]
    }
    function removeTask(todoListId: string, taskId: string) {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(el => el.id !== taskId)})

    }
    function addTask(title: string, todoListId: string) {
        const newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})

    }

    function changeStatus(taskId: string, newIsDone: boolean, todoListId: string) {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map
            (el => el.id === taskId ? {...el, isDone: newIsDone} : el)
        })

    }
    function changeFilter(todoListId: string, value: FilterValuesType) {

        setTodolists(todolists.map(el => el.id === todoListId ? {...el, filter: value} : el))
    }

    const addTodoList = (newTitle: string) => {
        const newTodoListID = v1()
        const newTodo: todolistsType = {id: newTodoListID, title: newTitle, filter: 'all'}
        setTodolists([newTodo, ...todolists])
        setTasks({...tasks, [newTodoListID]: []})
    }

    const updateTask = (todoListId: string, taskId: string, updateTitle: string) => {
        setTasks({
            ...tasks, [todoListId]: tasks[todoListId].map
            (el => el.id === taskId ? {...el, title: updateTitle} : el)
        })
    }
    const updateTodoListTitle = (todoListId: string, updateTitle: string) => {
       setTodolists(todolists.map(el=>el.id===todoListId ?{...el, title: updateTitle} :el))
    }
    return (
        <div className="App">

            <AddItemForm callBack={addTodoList}/>

            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                }
                return (

                    <Todolist
                        key={el.id}
                        todoListId={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={el.filter}
                        removeTodoList={removeTodoList}
                        updateTask={updateTask}
                        updateTodoListTitle={updateTodoListTitle}
                    />
                )
            })}


        </div>
    );
}

export default App;
