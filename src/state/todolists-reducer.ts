import {v4} from "uuid";
import {FilterValuesType, TodolistType} from "../AppWithRedux";

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

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

const initialState: TodolistType[] = []

export const todolistsReducer = (state=initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: 'all'}, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const newState = [...state]
            const todolist = newState.find(tl => tl.id === action.id);
            const newTodolistTitle = action.title
            if (todolist) {
                todolist.title = newTodolistTitle;
            }
            return newState
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let newState = [...state]
            const todolist = newState.find(tl => tl.id === action.id);

            if (todolist) {
                todolist.filter = action.filter;
            }
            return newState
        }
        default:
            return state
    }
}

export const RemoveTodolist = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const AddTodolist = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v4()}
}

export const ChangeTodolistTitle = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const ChangeTodolistFilter = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER',id, filter}
}
