import { useContext, useState } from "react";
import styled from "styled-components";
import { ToDoContext } from "../contexts/todoContext";

const FormInput = styled.input`
    width: 335px;
    outline: none;
    font-size: 13px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
`

const TodoInput = () => {
    const { dispatch } = useContext(ToDoContext);
    const [userInput, setUserInput] = useState("");

    const handleChange = (event) => {
        setUserInput(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({ type: 'CREATE_TODO', value: userInput, dispatch });
        setUserInput("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormInput value={userInput}
                type="text" onChange={handleChange}
                placeholder="New ToDo"
            ></FormInput>
        </form>
    )
}

export default TodoInput;
