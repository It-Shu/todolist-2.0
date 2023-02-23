import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from "../addItem-form/AddItemForm";
import EditableSpan from "../editable-span/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TasksStateType} from "../../AppWithRedux";

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
    changeFilter: (status: FilterValuesType, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTaskTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterValuesType
    removeTodolist: (id: string) => void
}

const Todolist = React.memo((props: TodolistTypes) => {
    console.log('Todolist called')
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
        changeTaskTitle,
        changeTodolistTitle,
    } = props;

    const addNewTask = useCallback((title: string) => {
        addTask(title, todolistId);
    }, [addTask, todolistId]);

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

    const onChangeTodolistTitle = (title: string) => {
        changeTodolistTitle(todolistId, title);
    }

    let taskForTodolist = task;

    if (filter === 'active') {
        taskForTodolist = task.filter(ts => !ts.isDone);
    }
    if (filter === 'completed') {
        taskForTodolist = task.filter(ts => ts.isDone);
    }

    return (
        <div>
            <h3><EditableSpan title={todolistTitle} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addNewTask}/>
            <div>
                {
                    taskForTodolist.map(ts => {

                        const onRemoveTaskClickHandler = () => {
                            removeTask(ts.id, todolistId);
                        };

                        const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            const newIsDoneValue = event.currentTarget.checked;

                            changeTaskStatus(ts.id, newIsDoneValue, todolistId);
                        };

                        const onTitleChangeHandler = (newValue: string) => {
                            changeTaskTitle(ts.id, newValue, todolistId);
                        }

                        return <div key={ts.id}>
                            <Checkbox color={'secondary'} checked={ts.isDone} onChange={onChangeCheckboxHandler}/>
                            <EditableSpan title={ts.title} isDone={ts.isDone} onChange={onTitleChangeHandler}/>
                            <IconButton onClick={onRemoveTaskClickHandler}>
                                <Delete/>
                            </IconButton>
                        </div>;
                    })
                }
            </div>
            <div>
                <Button
                    variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
                >All
                </Button>
                <Button
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}
                >Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}
                >Completed
                </Button>
            </div>
        </div>
    );
});

export default Todolist;
