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

const Todo = ({ value, toggleHandler }) => {
    const { id, content, isCompleted } = value;

    const clickHandler = (event) => {
        toggleHandler(id);
    }

    return (
        <StyledLi id={`todo-${id}`}>
            <StyledLabel htmlFor={id}>
                <input type="checkbox"
                    id={id} onChange={clickHandler}
                    checked={!!isCompleted}
                ></input>
                {content}
            </StyledLabel>
            <StyledButton onClick={() => alert('implement me')}>삭제</StyledButton>
        </StyledLi>
    );
}

export default Todo;
