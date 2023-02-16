import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './components/todolist/Todolist';
import {v4} from 'uuid';
import AddItemForm from "./components/addItem-form/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilterValueType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistId1 = v4();
    const todolistId2 = v4();

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v4(), title: 'CSS&HTML', isDone: true},
            {id: v4(), title: 'JS', isDone: true},
        ],
        [todolistId2]: [
            {id: v4(), title: 'React', isDone: false},
            {id: v4(), title: 'REST API', isDone: false},
        ],
    });

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
        },
        {
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
        },
    ]);

    const addNewTodolist = (title: string) => {
        let newTodolistId = v4()
        let newTodolist: TodolistType = {id: newTodolistId, title, filter: 'all'}
        setTodolists([
            newTodolist, ...todolists
        ])
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    const addTask = (title: string, todolistId: string) => {
        const task = {id: v4(), title, isDone: false};

        const todolistTasks = tasks[todolistId];

        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    };

    const removeTask = (id: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];

        tasks[todolistId] = todolistTasks.filter(task => task.id !== id);
        setTasks({...tasks});
    };

    const changeFilter = (value: FilterValueType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);

        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    };

    const changeStatus = (id: string, isDone: boolean, todolistId: string) => {
        const todolistTasks = tasks[todolistId];

        const task = todolistTasks.find(ts => ts.id === id);

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
            task.isDone = isDone;
            sortTasksByIsDone(todolistTasks)
            setTasks({...tasks});
        }
    };

    const changeFilterStatus = (id: string, filter: FilterValueType, task: TasksStateType) => {
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

    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id));

        delete tasks[id];

        setTasks({...tasks});
    };

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        //достанем нужный массив по todolistId:
        const todolistTasks = tasks[todolistId];
        // найдём нужную таску:
        const task = todolistTasks.find(task => task.id === id);
        //изменим таску, если она нашлась
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({...tasks});
        }
    }

    function changeTodolistTitle(id: string, title: string) {
        // найдём нужный todolist
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            // если нашёлся - изменим ему заголовок
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

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

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        todolistId={tl.id}
                                        key={tl.id}
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

export default App;
