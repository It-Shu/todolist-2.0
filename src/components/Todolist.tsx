import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "../App";

export interface TaskType {
    id: string
    title: string
    isDone: boolean
}

interface TodolistTypes {
    todolistTitle: string
    task: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (status: FilterValueType) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

const Todolist = (props: TodolistTypes) => {

    const {
        todolistTitle,
        task,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
    } = props

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);


    const addNewTask = () => {
        if (title.trim() !== '') {
            addTask(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(title)
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => (e.charCode === 13) ? addNewTask() : null

    const onAllClickHandler = () => {
        changeFilter('all')
    }
    const onActiveClickHandler = () => {
        changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        changeFilter('completed')
    }

    return (
        <div>
            <h3>{todolistTitle}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addNewTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {task.map((t) => {

                    const onRemoveTaskClickHandler = () => {
                        removeTask(t.id)
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        changeTaskStatus(t.id, newIsDoneValue)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" defaultChecked={t.isDone} onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveTaskClickHandler}>X</button>
                    </li>
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>All</button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''}
                        onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;
