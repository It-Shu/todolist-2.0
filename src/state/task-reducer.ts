import {FilterValuesType, TasksStateType, TodolistType} from "../App";

import {v4} from "uuid";
import {TaskType} from "../components/todolist/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

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


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const newState = state
            const todolistTasks = newState[action.todolistId];

            state[action.todolistId] = todolistTasks.filter(task => task.id !== action.id);
            return newState
        }
        case 'ADD-TASK': {
            const newState = state
            const task = {id: v4(), title: 'juice', isDone: false};

            const todolistTasks = newState[action.todolistId];

            newState[action.todolistId] = [task, ...todolistTasks];
            return newState
        }
        case 'CHANGE-TASK-FILTER': {
            let newState = state
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
        case "CHANGE-TASK-TITLE": {
            //достанем нужный массив по todolistId:
            const newState = state
            const todolistTasks = newState[action.todolistId];
            // найдём нужную таску:
            const task = todolistTasks.find(task => task.id === action.id);
            //изменим таску, если она нашлась
            if (task) {
                task.title = 'corn bread';
                // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            }
            return newState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            const newState = state
            delete newState[action.id];
            return newState
        }
        default:
            throw new Error('I don`t understand this type')
    }
}

export const removeTask = (id: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const addTask = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatus = (id: string, isDone: boolean, todolistId: string): ChangeTaskFilterActionType => {
    return {type: 'CHANGE-TASK-FILTER', id, isDone, todolistId}
}

export const changeTaskTitle = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', id, title, todolistId}
}
