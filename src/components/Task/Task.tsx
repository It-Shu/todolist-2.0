import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "../editable-span/EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    taskId: string
    taskTitle: string
    taskStatus: boolean
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (id: string, newTaskTitle: string, todolistId: string) => void
}

const Task = React.memo((props: TaskPropsType) => {

    const {
        taskId,
        taskTitle,
        taskStatus,
        todolistId,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    } = props

    const onRemoveTaskClickHandler = useCallback(() => {
        removeTask(taskId, todolistId);
    },[removeTask, taskId, todolistId]);

    const onChangeCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = event.currentTarget.checked;

        changeTaskStatus(taskId, newIsDoneValue, todolistId);
    };

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(taskId, newValue, todolistId);
    }, [changeTaskTitle, taskId, todolistId])

    return (
        <div>
            <Checkbox color={'secondary'} checked={taskStatus} onChange={onChangeCheckboxHandler}/>
            <EditableSpan title={taskTitle} isDone={taskStatus} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onRemoveTaskClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
        ;
});

export default Task;
