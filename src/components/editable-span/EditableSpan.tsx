import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

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

    const activateEditMode = () => {
        setEditMode(!editMode)
        onChange(title)
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setEditMode(!editMode)
        }
    };

    return editMode
        ? <TextField variant={'outlined'} value={title} autoFocus onBlur={activateEditMode} onChange={onChangeHandler}
                     onKeyPress={onKeyPressHandler}/>
        : <span className={isDone ? 'is-done' : ''} onDoubleClick={activateEditMode}>{title}</span>
};

export default EditableSpan;
