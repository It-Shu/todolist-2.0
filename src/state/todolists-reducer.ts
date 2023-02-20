import {FilterValuesType} from "../App";
import {v4} from "uuid";

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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

interface StateType {
    id: string
    title: string
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (state: StateType[], action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolistId = v4()
            const title = 'New Todolist'
            const newTodolist = {id: newTodolistId, title, filter: 'all'}
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


export const RemoveTodolist = (id: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}

export const AddTodolist = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title}
}

export const ChangeTodolistTitle = ( id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const ChangeTodolistFilter = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER',id, filter}
}
