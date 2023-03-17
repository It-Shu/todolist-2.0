// import {TasksStateType, TodolistType} from "../App";
import {tasksReducer} from "./task-reducer";
import {AddTodolist, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {TodolistType} from "../api/todolist-api";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = AddTodolist("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
