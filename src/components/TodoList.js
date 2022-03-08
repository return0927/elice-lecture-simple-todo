import styled from "styled-components";
import Todo from "./Todo";

const StyledUl = styled.ul`
    padding: 0;
`

const TodoList = ({ toDoList, toggleHandler, deleteHandler, updateHandler }) => {
    return (
        <StyledUl className="to-do-list">
            {toDoList.map((v) =>
                <Todo key={v.id}
                        value={v}
                        toggleHandler={toggleHandler}
                        deleteHandler={deleteHandler}
                        updateHandler={updateHandler}>
                </Todo>)
            }
        </StyledUl>
    );
};

export default TodoList;
