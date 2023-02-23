import React, {ChangeEvent, useCallback} from 'react';
import {AddItemForm} from "../addItem-form/AddItemForm";
import EditableSpan from "../editable-span/EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType, TasksStateType} from "../../AppWithRedux";
import Task from "../Task/Task";

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

    const onAllClickHandler = useCallback(() => {
        changeFilter('all', todolistId);
    }, [changeFilter, todolistId]);
    const onActiveClickHandler = useCallback(() => {
        changeFilter('active', todolistId);
    }, [changeFilter, todolistId]);
    const onCompletedClickHandler = useCallback(() => {
        changeFilter('completed', todolistId);
    }, [changeFilter, todolistId]);

    const onChangeTodolistTitle = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title);
    }, [changeTodolistTitle, todolistId])

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

                        return <Task
                            key={ts.id}
                            task={ts}
                            todolistId={todolistId}
                            taskTitle={ts.title}
                            taskStatus={ts.isDone}
                            removeTask={removeTask}
                            changeTaskTitle={changeTaskTitle}
                            changeTaskStatus={changeTaskStatus}
                        />

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
