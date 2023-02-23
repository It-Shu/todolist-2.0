import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormType) => {
    const {addItem} = props;

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addNewTodoList = () => {
        // if (title.trim() !== '' && addItem) {
        if (title.trim() !== '') {
            addItem(title);
            setTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError(null);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        return event.key === 'Enter' ? addNewTodoList() : null;
    };

    return (

        <div>
            <TextField
                variant={'outlined'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={'Title'}
                helperText={error}
            />
            <IconButton color={'primary'} onClick={addNewTodoList}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

