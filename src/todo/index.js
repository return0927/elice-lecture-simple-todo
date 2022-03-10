import styled from "styled-components";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAxios from "./tools/useAxios";
import { ToDoContext } from "./contexts/todoContext";

const Container = styled.div`
  width: 350px;
  margin: 10px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
`

function ToDoApp() {
    const { state, dispatch } = useContext(ToDoContext);
    const { isLoading, toDoList } = state;

  const [lastFetched, setLastFetched] = useState(new Date());

  useEffect(() => {
    useAxios.setup();
    const fetch = async () => {
      const resp = await axios.get("/");

      return resp.data.records;
    };

    fetch().then((list) => {
      list.sort((a, b) => {
        return Date.parse(a.createdTime) - Date.parse(b.createdTime);
      });
      dispatch({
        type: 'SET_TODOLIST',
        value: list.map((v) => { return { id: v.id, content: v.fields.Name, isCompleted: v.fields.isCompleted }; })
      });
      dispatch({ type: 'SET_LOADING', value : false });
    });
  }, [lastFetched]);

  if (isLoading) return <Container>
    <span>Loading...</span>
  </Container>
  
  return (
    <Container>
    <TodoInput></TodoInput>
    <TodoList></TodoList>
    </Container>
  );
}

export default ToDoApp;
