import { useState } from "react";
import styled from "styled-components";
import "./Todo.css";

const StyledLi = styled.li`
    list-style: none;
    overflow: hidden;
    width: 100%;
    margin-bottom: 10px;
`

const StyledLabel = styled.label`
    float: left;
    cursor: pointer;
`

const StyledButton = styled.button`
    float: right;
    background: palevioletred;
    color: #FFF;
    border-radius: 3px;
    border: 2px solid palevioletred;
    padding: 3px 10px;
    outline: none;
    cursor: pointer;
`

const Todo = ({ value, toggleHandler, deleteHandler, updateHandler }) => {
    const { id, content, isCompleted } = value;
    const [ isEditing, setIsEditing ] = useState(false);
    const [ updatingContent, setUpdatingContent ] = useState(content);

    const clickHandler = (event) => {
        toggleHandler(id);
    }

    function clickDeleteHandler(event) {
        event.preventDefault();
        deleteHandler(id);
    }

    function changeInputHandler(event) {
        setUpdatingContent(event.target.value);
    }

    function updateContent() {
        updateHandler(id, updatingContent);
        setIsEditing(false);
    }

    function keyPressHandler(event) {
        if (event.charCode === 13) {
            updateContent();
        }
    }

    return (
        <StyledLi id={`todo-${id}`}>
            <StyledLabel htmlFor={id}>
                <input type="checkbox"
                    id={id} onChange={clickHandler}
                    checked={!!isCompleted}
                ></input>
                {
                    (isEditing)
                    ? <input value={updatingContent} onChange={changeInputHandler}
                            onKeyPress={keyPressHandler}></input>
                    : <>{content}</>
                }
            </StyledLabel>
            <StyledButton onClick={clickDeleteHandler} delete={true}>삭제</StyledButton>
            {
                (isEditing)
                ? <StyledButton onClick={updateContent}>완료</StyledButton>
                : <StyledButton onClick={() => setIsEditing(true)}>수정</StyledButton>
            }
        </StyledLi>
    );
}

export default Todo;
