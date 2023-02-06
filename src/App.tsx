import React, { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from './components/todolist/Todolist';
import { v4 } from 'uuid';

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
            { id: v4(), title: 'CSS&HTML', isDone: true },
            { id: v4(), title: 'JS', isDone: true },
        ],
        [todolistId2]: [
            { id: v4(), title: 'React', isDone: false },
            { id: v4(), title: 'REST API', isDone: false },
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

    const addTask = (title: string, todolistId: string) => {
        const task = { id: v4(), title, isDone: false };

        const todolistTasks = tasks[todolistId];

        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({ ...tasks });
    };

    const removeTask = (id: string, todolistId: string) => {
        const todolistTasks = tasks[todolistId];

        tasks[todolistId] = todolistTasks.filter(task => task.id !== id);
        setTasks({ ...tasks });
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

        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasks });
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

        setTasks({ ...tasks });
    };

    return (
        <div className='App'>
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

                    return <Todolist
                        todolistId={tl.id}
                        key={tl.id}
                        todolistTitle={tl.title}
                        task={ changeFilterStatus(tl.id, tl.filter, tasks)}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />;
                })
            }
        </div>
    );
}

export default App;
