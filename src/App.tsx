import React, {useState} from "react";
import "./App.css";
import Todolist, {TaskType} from "./components/Todolist";
import {v4} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v4(), title: "CSS&HTML", isDone: true},
        {id: v4(), title: "JS", isDone: true},
        {id: v4(), title: "React", isDone: false},
        {id: v4(), title: "REST API", isDone: false},
        {id: v4(), title: "graphQL", isDone: false},
    ])

    const [filter, setFilter] = useState<FilterValueType>("all")

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }
    let taskForTodolist = tasks

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => !t.isDone);
    }

    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone);
    }

    const changeFilter = (value: FilterValueType) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title="What to learn"
                task={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
