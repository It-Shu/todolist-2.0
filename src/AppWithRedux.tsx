import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist, {TaskType} from './components/todolist/Todolist';
import {AddItemForm} from "./components/addItem-form/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddNewTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask} from "./state/task-reducer";
import {
    AddTodolist,
    ChangeTodolistFilter,
    ChangeTodolistTitle, FilterValuesType,
    RemoveTodolist,
    SetTodolists, TodolistDomainType,
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store/store";
import {todolistAPI} from "./api/todolist-api";

// export type FilterValuesType = 'all' | 'active' | 'completed'
//
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
       todolistAPI.GetTodolists()
           .then((res) => {
               let todos = res.data
               dispatch(SetTodolists(todos))
           })
    },[])

    // todolist
    const removeTodolist = useCallback((id: string) => {
        dispatch(RemoveTodolist(id))
    },[]);

    const addNewTodolist = useCallback((title: string) => {
        dispatch(AddTodolist(title))
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodolistTitle(id, title))
    },[])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(ChangeTodolistFilter(value, todolistId))
    },[]);
    // tasks
    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(RemoveTask(id, todolistId))

    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(AddNewTask(title, todolistId))
    }, []);

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        const action = ChangeTaskStatus(id, isDone, todolistId)
        dispatch(action)
    }, []);

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(ChangeTaskTitle(id, newTitle, todolistId))
    }, []);

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
                            let todolistTasks = tasks[tl.id]
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        task={todolistTasks}
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
