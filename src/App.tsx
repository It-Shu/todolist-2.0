import React, {useState} from "react";
import "./App.css";
import Todolist, {TaskType} from "./components/Todolist";
import {v4} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v4(), title: "CSS&HTML", isDone: true},
        {id: v4(), title: "JS", isDone: true},
        {id: v4(), title: "React", isDone: false},
        {id: v4(), title: "REST API", isDone: false},
        {id: v4(), title: "graphQL", isDone: false},
    ])

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {
            id: v4(),
            title: "What to learn",
            filter: "all",
        },
        {
            id: v4(),
            title: "What to buy",
            filter: "all",
        },
    ])

    const addTask = (title: string) => {
        let task = {id: v4(), title: title, isDone: false};

        let newTasks = [...tasks, task]
        setTasks(newTasks)
    }

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }


    const changeFilter = (value: FilterValueType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const changeStatus = (id: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    const changeFilterStatus = (filter: FilterValueType, task: TaskType[]) => {
        let todolistTask = task
        if (filter === "active") {
            todolistTask = tasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            todolistTask = tasks.filter(t => t.isDone);
        }
        return todolistTask
    }

    return (
        <div className="App">
            {
                todolists.map(tl => {
                    let taskForTodolist = tasks

                    // if (tl.filter === "active") {
                    //     taskForTodolist = tasks.filter(t => !t.isDone);
                    // }
                    //
                    // if (tl.filter === "completed") {
                    //     taskForTodolist = tasks.filter(t => t.isDone);
                    // }
                    changeFilterStatus(tl.filter, taskForTodolist)
                    return <Todolist
                        todolistID={tl.id}
                        key={tl.id}
                        todolistTitle={tl.title}
                        task={changeFilterStatus(tl.filter, taskForTodolist)}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                })
            }
        </div>
    );
}

export default App;
