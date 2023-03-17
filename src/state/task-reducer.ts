import {v4} from "uuid";
import {TaskType} from "../components/todolist/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TodolistType} from "../api/todolist-api";

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
    todolistId: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todolistId: string
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(task => task.id !== action.id);
            return ({...state})
        }
        case 'ADD-TASK': {
            const newState = {...state}
            const task = {id: v4(), title: action.title, isDone: false};

            const todolistTasks = newState[action.todolistId];

            newState[action.todolistId] = [task, ...todolistTasks];
            return newState
        }
        case "CHANGE-TASK-TITLE": {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.map(ts => {
                if (ts.id === action.id) {
                    return {...ts, title: action.title}
                } else {
                    return ts
                }
            });
            return ({...state})
        }
        case 'CHANGE-TASK-STATUS': {

            const todolistTasks = state[action.todolistId];

            const sortTasksByIsDone = (tasksArray: TaskType[]) => {
                return tasksArray.sort((a, b) => {
                    if (a.isDone === b.isDone) {
                        return 0;
                    }
                    if (a.isDone) {
                        return 1;
                    }
                    return -1;
                });
            }

            state[action.todolistId] = todolistTasks.map(ts => {
                if (ts.id === action.id) {
                    return {...ts, isDone: action.isDone}
                } else {
                    return ts
                }
            });
            sortTasksByIsDone(state[action.todolistId])
            return ({...state})
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.id];
            return newState
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        default:
            return state
    }
}

export const RemoveTask = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const AddNewTask = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const ChangeTaskStatus = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', id, isDone, todolistId}
}

export const ChangeTaskTitle = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId}
}

export const SetTodolists = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS',todolists}
}
