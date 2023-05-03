import React, {ChangeEvent, useState} from 'react';

type PropsTypes = {
    oldTitle: string
    callBack: (updateTitle: string) => void
}
export const EditableSpan = (props: PropsTypes) => {
    const [updateTitle, setUpdateTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateTitle(e.currentTarget.value)
    }
    const addTask = () => {
        props.callBack(updateTitle)
    }
    const editHandler = () => {
        setEdit(!edit)
        if(edit) addTask()
    }

    return (
        edit
            ? <input type='text'
                     onChange={onChangeHandler}
                     value={updateTitle}
                     onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>
    );
};

