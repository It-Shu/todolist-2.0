import React, {useCallback} from 'react';
import './App.css';
import Todolist, {TaskType} from './components/todolist/Todolist';
import {AddItemForm} from "./components/addItem-form/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddNewTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "./state/task-reducer";
import {AddTodolist, ChangeTodolistFilter, ChangeTodolistTitle, RemoveTodolist,} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";

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

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // todolist
    const removeTodolist = useCallback((id: string) => {
        dispatch(RemoveTodolist(id))
    },[dispatch]);

    const addNewTodolist = useCallback((title: string) => {
        dispatch(AddTodolist(title))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitle(id, title))
    },[dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilter(value, todolistId))
    },[dispatch]);
    // tasks
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTask(id, todolistId))

    }, [dispatch]);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(AddNewTask(title, todolistId))
    }, [dispatch]);

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = ChangeTaskStatus(id, isDone, todolistId)
        dispatch(action)
    }, [dispatch]);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(ChangeTaskTitle(id, newTitle, todolistId))
    }, [dispatch]);

    const changeFilterStatus =(id: string, filter: FilterValuesType, task: TasksStateType) => {
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
