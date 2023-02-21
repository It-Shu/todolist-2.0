import {FilterValuesType} from "../App";
import {v4} from "uuid";

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

interface TodolistStateType {
    id: string
    title: string
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state: TodolistStateType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const title = 'New Todolist'
            const newTodolist = {id: action.todolistId, title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const newState = state
            const todolist = newState.find(tl => tl.id === action.id);
            const newTodolistTitle = 'New Todolist'
            if (todolist) {
                todolist.title = newTodolistTitle;
            }
            return [...newState]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let newState = state
            const todolist = newState.find(tl => tl.id === action.id);

            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...newState]
        }
        default:
            throw new Error('I don`t understand this type')
    }
}


export const removeTodolist = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const addTodolist = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v4()}
}

export const changeTodolistTitle = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilter = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER',id, filter}
}
