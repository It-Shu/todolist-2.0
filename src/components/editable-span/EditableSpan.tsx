import React from 'react';

interface EditableSpanType {
    isDone: boolean
    title: string
}

const EditableSpan = (props: EditableSpanType) => {

    

    const {
        isDone,
        title,
    } = props;


    return <span className={isDone ? 'is-done' : ''}>{title}</span>
};

export default EditableSpan;
