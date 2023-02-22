// import {FilterValuesType, TasksStateType, TodolistType} from "../App";

import {v4} from "uuid";
import {TaskType} from "../components/todolist/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";

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
export type ChangeTaskFilterActionType = {
    type: 'CHANGE-TASK-FILTER'
    id: string
    isDone: boolean
    todolistId: string
}

type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskFilterActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(task => task.id !== action.id);
            return state
        }
        case 'ADD-TASK': {
            const newState = {...state}
            const task = {id: v4(), title: action.title, isDone: false};

            const todolistTasks = newState[action.todolistId];

            newState[action.todolistId] = [task, ...todolistTasks];
            return newState
        }
        case "CHANGE-TASK-TITLE": {
            const newState = {...state}
            const todolistTasks = newState[action.todolistId];
            const task = todolistTasks.find(task => task.id === action.id);
            if (task) {
                task.title = action.title;
            }
            return newState
        }
        case 'CHANGE-TASK-FILTER': {
            let newState = {...state}
            const todolistTasks = newState[action.todolistId];

            const task = todolistTasks.find(ts => ts.id === action.id);
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

            if (task) {
                task.isDone = action.isDone;
                sortTasksByIsDone(todolistTasks)
            }
            return newState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.id];
            return newState
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

export const ChangeTaskStatus = (id: string, isDone: boolean, todolistId: string): ChangeTaskFilterActionType => {
    return {type: 'CHANGE-TASK-FILTER', id, isDone, todolistId}
}

export const ChangeTaskTitle = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId}
}
