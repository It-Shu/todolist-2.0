import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

const enterCharCodeKey = 13;

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
        return event.charCode === enterCharCodeKey ? addNewTodoList() : null;
    };

    return (

        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? 'error' : ''}
            />
            <button onClick={addNewTodoList}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};

export default AddItemForm;
