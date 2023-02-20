import {FilterValuesType, TasksStateType} from "../App";

import {v4} from "uuid";
import {TaskType} from "../components/todolist/Todolist";

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


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const todolistTasks = state[action.todolistId];

            state[action.todolistId] = todolistTasks.filter(task => task.id !== action.id);
            return {...state}
        }
        case 'ADD-TASK':{
            const task = {id: v4(), title: 'juice', isDone: false};

            const todolistTasks = state[action.todolistId];

            state[action.todolistId] = [task, ...todolistTasks];
            return {...state}
        }
        case 'CHANGE-TASK-FILTER': {
            const todolistTasks = state[action.todolistId];

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
            return {...state}
        }
        default:
            throw new Error('I don`t understand this type')
    }
}

export const removeTask = (id: string, todolistId: string) : RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', id, todolistId}
}

export const addTask = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeTaskStatus = ( id: string, isDone: boolean, todolistId: string): ChangeTaskFilterActionType => {
    return {type: 'CHANGE-TASK-FILTER', id, isDone, todolistId}
}

// export const ChangeTodolistFilter = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
//     return {type: 'CHANGE-TODOLIST-FILTER',id, filter}
// }
