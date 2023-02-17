import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

interface AddItemFormType {
    addItem?: (title: string) => void
}

const AddItemForm = (props: AddItemFormType) => {
    const {addItem} = props;

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addNewTodoList = () => {
        if (title.trim() !== '' && addItem) {
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
};

export default AddItemForm;
