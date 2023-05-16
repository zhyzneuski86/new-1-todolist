import {FilterValuesType, todolistsType} from "../App";
import {v1} from "uuid";

export const todolistsReducer=(state: todolistsType[], action: TsarTypeAction): todolistsType[]=> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':{
            return  state.filter(el => el.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST":{
            const newTodoListID = v1()
            const newTodo: todolistsType = {id: newTodoListID, title: action.payload.newTitle, filter: 'all'}
            // setTodolists([newTodo, ...todolists])
            // setTasks({...tasks, [newTodoListID]: []})
            return [...state, newTodo]
        }
        case "CHANGE-TODOLIST-TITLE": {
            //setTodolists(todolists.map(el=>el.id===todoListId ?{...el, title: updateTitle} :el))
            return state.map(el=>el.id === action.payload.todolistId ? {...el, title:action.payload.newTitle}:el)
        }
        case "CHANGE-TODOLIST-FILTER":{
            //setTodolists(todolists.map(el => el.id === todoListId ? {...el, filter: value} : el))
            return state.map(el=>el.id === action.payload.todolistId ? {...el, filter: action.payload.filterValue}:el)
        }
        default: return state
    }
}
type TsarTypeAction= removeTodoListACType | addTodoListACType | updateTodoListTitleACType | changeFilterACType

type removeTodoListACType=ReturnType<typeof removeTodoListAC>
type addTodoListACType=ReturnType<typeof addTodoListAC>
type updateTodoListTitleACType=ReturnType<typeof updateTodoListTitleAC>
type changeFilterACType=ReturnType<typeof changeFilterAC>

export const removeTodoListAC = (todolistId: string)=>{
    return {
        type: 'REMOVE-TODOLIST',
        payload:{
            todolistId
        }
    } as const
}

export const addTodoListAC =(newTitle: string)=>{
    return {
        type: 'ADD-TODOLIST',
        payload:{
            newTitle
        }
    } as const
}
export const updateTodoListTitleAC =(todolistId: string, newTitle: string)=>{
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload:{
            todolistId, newTitle
        }
    } as const
}
export const changeFilterAC =(todolistId: string, filterValue: FilterValuesType)=>{
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload:{
            todolistId,
            filterValue
        }
    } as const
}


