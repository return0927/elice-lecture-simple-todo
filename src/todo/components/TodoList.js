import { useContext } from "react";
import styled from "styled-components";
import { ToDoContext } from "../contexts/todoContext";
import Todo from "./Todo";

const StyledUl = styled.ul`
    padding: 0;
`

const TodoList = () => {
    const { state } = useContext(ToDoContext);
    const { toDoList } = state;

    return (
        <StyledUl className="to-do-list">
            {toDoList.map((v) =>
                <Todo key={v.id} value={v}>
                </Todo>)
            }
        </StyledUl>
    );
};

export default TodoList;
