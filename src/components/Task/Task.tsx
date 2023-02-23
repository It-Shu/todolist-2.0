import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../editable-span/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../todolist/Todolist";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTaskTitle: string, todolistId: string) => void
}

const Task = React.memo((props: TaskPropsType) => {

    const {
        task,
        todolistId,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    } = props

    const onRemoveTaskClickHandler = useCallback(() => {
        removeTask(task.id, todolistId);
    }, [removeTask, task.id, todolistId]);

    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = event.currentTarget.checked;

        changeTaskStatus(task.id, newIsDoneValue, todolistId);
    };

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }, [changeTaskTitle, task.id, todolistId])

    return (
        <div>
            <Checkbox color={'secondary'} checked={task.isDone} onChange={onChangeCheckboxHandler}/>
            <EditableSpan title={task.title} isDone={task.isDone} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onRemoveTaskClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
        ;
});

export default Task;
