import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

interface EditableSpanType {
    isDone?: boolean
    title: string
    onChange: (value: string) => void
}

const EditableSpan = (props: EditableSpanType) => {

    const {
        isDone,
        title,
        onChange,
    } = props

    const [editMode, setEditMode] = useState(false)
    // const [taskTitle, setTaskTitle] = useState(title)

    const activateEditMode = () => {
        setEditMode(!editMode)
        // setTaskTitle(taskTitle)
        onChange(title)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if ( event.charCode === 13) {
            setEditMode(!editMode)
            // setTaskTitle(taskTitle)
        }
    };

    return editMode
        ? <input type="text" value={title} autoFocus onBlur={activateEditMode} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
        : <span className={isDone ? 'is-done' : ''} onDoubleClick={activateEditMode}>{title}</span>
};

export default EditableSpan;
