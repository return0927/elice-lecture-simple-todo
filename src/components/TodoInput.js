import { useState } from "react";
import styled from "styled-components";

const FormInput = styled.input`
    width: 335px;
    outline: none;
    font-size: 13px;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 10px;
`

const TodoInput = ({ submitHandler }) => {
    const [userInput, setUserInput] = useState("");

    const handleChange = (event) => {
        setUserInput(event.currentTarget.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        submitHandler(userInput);
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
