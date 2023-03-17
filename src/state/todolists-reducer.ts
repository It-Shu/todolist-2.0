import {v4} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "react";
import {AppRootStateType} from "./store/store";

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

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

const initialState: TodolistDomainType[] = []

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}, ...state]
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
        case 'SET-TODOLISTS': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }))
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

export const SetTodolists = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS',todolists}
}


// type RemoveTodolistThunkType = ThunkAction<void, RootStateType, unknown, RemoveTodolistActionType>;
//
// export const thunkCreator: ActionCreator<RemoveTodolistThunkType> = (todolistId: string) => {
//     return (dispatch: Dispatch<any>, getState: () => AppRootStateType) => {
//         todolistAPI.DeleteTodolist(todolistId)
//             .then((res) => {
//                 dispatch(RemoveTodolist(todolistId));
//             })
//     }
// };
