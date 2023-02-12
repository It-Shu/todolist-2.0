import React, {ChangeEvent} from 'react';
import {FilterValueType} from '../../App';
import AddItemForm from "../addItem-form/AddItemForm";
import EditableSpan from "../editable-span/EditableSpan";

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

    const addNewTask = (title: string) => {
        addTask(title, todolistId);
    };

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
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
            <h3>{todolistTitle}
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <AddItemForm addItem={addNewTask}/>
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

                        return <li key={ts.id}>
                            <input type="checkbox" defaultChecked={ts.isDone} onChange={onChangeCheckboxHandler}/>
                            {/*<EditableSpan title={ts.title} isDone={ts.isDone}/>*/}
                            <span className={ts.isDone ? 'is-done' : ''}>{ts.title}</span>
                            <button onClick={onRemoveTaskClickHandler}>X</button>
                        </li>;
                    })
                }
            </ul>
            <div>
                <button
                    className={filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
                </button>
                <button
                    className={filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
                </button>
                <button
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
                </button>
            </div>
        </div>
    );
};

export default Todolist;
