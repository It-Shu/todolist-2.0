import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValueType } from '../../App';

export interface TaskType {
    id: string
    title: string
    isDone: boolean
}

interface TodolistTypes {
    todolistId: string
    todolistTitle: string
    task: Array<TaskType>
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (status: FilterValueType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
}

const enterCharCodeKey = 13;

const Todolist = (props: TodolistTypes) => {

    const {
        todolistTitle,
        task,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        filter,
        todolistId,
        removeTodolist,
    } = props;

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addNewTask = () => {
        if (title.trim() !== '') {
            addTask(title, todolistId);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(null);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.charCode === enterCharCodeKey ? addNewTask() : null;
    };

    const onAllClickHandler = () => {
        changeFilter('all', todolistId);
    };
    const onActiveClickHandler = () => {
        changeFilter('active', todolistId);
    };
    const onCompletedClickHandler = () => {
        changeFilter('completed', todolistId);
    };

    return (
        <div>
            <h3>{todolistTitle}<button onClick={removeTodolistHandler}>X</button></h3>
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
                {
                    task.map(ts => {

                        const onRemoveTaskClickHandler = () => {
                            removeTask(ts.id, todolistId);
                        };

                        const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked;

                            changeTaskStatus(ts.id, newIsDoneValue, todolistId);
                        };

                        return <li key={ts.id} >
                            <input type="checkbox" defaultChecked={ts.isDone} onChange={onChangeCheckboxHandler}/>
                            <span className={ts.isDone ? 'is-done' : ''}>{ts.title}</span>
                            <button onClick={onRemoveTaskClickHandler}>X</button>
                        </li>;
                    })
                }
            </ul>
            <div>
                <button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All</button>
                <button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active</button>
                <button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};

export default Todolist;
