import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './components/todolist/Todolist';
import {v4} from 'uuid';
import AddItemForm from "./components/addItem-form/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddNewTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, tasksReducer} from "./state/task-reducer";
import {
    AddTodolist,
    ChangeTodolistFilter,
    ChangeTodolistTitle,
    RemoveTodolist,
    todolistsReducer
} from "./state/todolists-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolistId1 = v4();
    const todolistId2 = v4();

    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v4(), title: 'CSS&HTML', isDone: false},
            {id: v4(), title: 'JS', isDone: false},
        ],
        [todolistId2]: [
            {id: v4(), title: 'React', isDone: false},
            {id: v4(), title: 'REST API', isDone: false},
        ],
    });

    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all',},
        {id: todolistId2, title: 'What to buy', filter: 'all',}
    ]);

    // todolist
    const removeTodolist = (id: string) => {
        let action = RemoveTodolist(id)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    };

    const addNewTodolist = (title: string) => {
        let action = AddTodolist(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        let action = ChangeTodolistTitle(id, title)
        dispatchToTodolists(action)
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let action = ChangeTodolistFilter(value, todolistId)
        dispatchToTodolists(action)
    };
    // tasks
    const removeTask = (id: string, todolistId: string) => {
        let action = RemoveTask(id, todolistId)
        dispatchToTasks(action)

    };

    const addTask = (title: string, todolistId: string) => {
        let action = AddNewTask(title, todolistId)
        dispatchToTasks(action)
    };

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        let action = ChangeTaskStatus(id, isDone, todolistId)
        dispatchToTasks(action)
    };

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let action = ChangeTaskTitle(id, newTitle, todolistId)
        dispatchToTasks(action)
    }

    const changeFilterStatus = (id: string, filter: FilterValuesType, task: TasksStateType) => {
        const allTodolistTasks = task[id];

        let taskForTodolist = allTodolistTasks;

        if (filter === 'active') {
            taskForTodolist = allTodolistTasks.filter(ts => !ts.isDone);
        }
        if (filter === 'completed') {
            taskForTodolist = allTodolistTasks.filter(ts => ts.isDone);
        }

        return taskForTodolist;

    };



    return (
        <div className='App'>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addNewTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {

                            // const allTodolistTasks = tasks[tl.id];
                            //
                            // let taskForTodolist = allTodolistTasks;
                            //
                            // if (tl.filter === 'active') {
                            //     taskForTodolist = allTodolistTasks.filter(ts => !ts.isDone);
                            // }
                            // if (tl.filter === 'completed') {
                            //     taskForTodolist = allTodolistTasks.filter(ts => ts.isDone);
                            // }

                            changeFilterStatus(tl.id, tl.filter, tasks);

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        task={changeFilterStatus(tl.id, tl.filter, tasks)}
                                        removeTask={removeTask}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
