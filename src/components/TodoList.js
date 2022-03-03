import styled from "styled-components";
import Todo from "./Todo";

const StyledUl = styled.ul`
    padding: 0;
`

const TodoList = ({ toDoList, toggleHandler }) => {
    return (
        <StyledUl className="to-do-list">
            {toDoList.map((v) => <Todo key={v.id} value={v} toggleHandler={toggleHandler}></Todo>)}
        </StyledUl>
    );
};

export default TodoList;
