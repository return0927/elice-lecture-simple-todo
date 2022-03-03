import styled from "styled-components";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { useState } from "react";

const Container = styled.div`
  width: 350px;
  margin: 10px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
`

function App() {
  const initialList = [
      { id: 1, content: "상쾌하게 기상하기",     isCompleted: true },
      { id: 2, content: "엘리스 이론 강의 듣기", isCompleted: true },
      { id: 3, content: "간지나게 점심 먹기",    isCompleted: true },
      { id: 4, content: "엘리스 실습 강의 듣기", isCompleted: false },
      { id: 5, content: "고풍스럽게 저녁 먹기",  isCompleted: false },
      { id: 6, content: "누구보다도 꿀잠 자기",  isCompleted: false }
  ];

  const [toDoList, setToDoList] = useState(initialList);

  const handleToggle = (id) => {
      const mapped = toDoList.map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
      );

      setToDoList(mapped);
  }

  const handleSubmit = (value) => {
      let copy = [...toDoList, { id: toDoList.length + 1, content: value, isCompleted: false }];
      setToDoList(copy);
  }

  return (
    <Container>
      <TodoInput submitHandler={handleSubmit}></TodoInput>
      <TodoList toDoList={toDoList} toggleHandler={handleToggle}></TodoList>
    </Container>
  );
}

export default App;
