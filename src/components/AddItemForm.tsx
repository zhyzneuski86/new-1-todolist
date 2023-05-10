import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";


type PropsTypes = {
    callBack: (title: string) => void

}

export const AddItemForm = (props: PropsTypes) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.callBack(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const buttonStyle = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px',
        // backgroundColor: 'black'
    }
    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}  />*/}
            <TextField
                size="small"
                id="outlined-basic"
                label={error ? "Title is required" : 'Please type here...'}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}/>

            {/*// <button onClick={addTask}>+</button>*/}
            <Button variant="contained"  onClick={addTask} style={buttonStyle}>+</Button>

            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
};

