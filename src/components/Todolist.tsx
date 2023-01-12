import React from 'react';
import {FilterValueType} from "../App";

export interface TaskType {
    id: string
    title: string
    isDone: boolean
}

interface TodolistTypes {
    title: string
    task: Array<TaskType>
    addTask: () => void
    removeTask: (taskId: string) => void
    changeFilter: (status: FilterValueType) => void
}

const Todolist = (props: TodolistTypes) => {

    const {
        title,
        task,
        removeTask,
        changeFilter,
        addTask,
    } = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input type="text"/>
                <button onClick={() => addTask()}>+</button>
            </div>
            <ul>
                {task.map(t => <li key={t.id}>
                    <input type="checkbox" defaultChecked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={() => removeTask(t.id)}>X</button>
                </li>)}
            </ul>
            <div>
                <button onClick={() => changeFilter('all')}>ALL</button>
                <button onClick={() => changeFilter('active')}>ACTIVE</button>
                <button onClick={() => changeFilter('completed')}>COMPLETED</button>
            </div>
        </div>
    );
};

export default Todolist;
