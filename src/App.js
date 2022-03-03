import styled from "styled-components";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "./tools/useAxios";

const Container = styled.div`
  width: 350px;
  margin: 10px auto;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 13px;
`

const initialList = [
    { id: 1, content: "상쾌하게 기상하기",     isCompleted: true },
    { id: 2, content: "엘리스 이론 강의 듣기", isCompleted: true },
    { id: 3, content: "간지나게 점심 먹기",    isCompleted: true },
    { id: 4, content: "엘리스 실습 강의 듣기", isCompleted: false },
    { id: 5, content: "고풍스럽게 저녁 먹기",  isCompleted: false },
    { id: 6, content: "누구보다도 꿀잠 자기",  isCompleted: false }
];

function App() {
  const [isLoading, setLoading] = useState(true);
  const [toDoList, setToDoList] = useState(initialList);
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
      setToDoList(list.map((v) => { return { id: v.id, content: v.fields.Name, isCompleted: v.fields.isCompleted }; }));
      setLoading(false);
    });
  }, [lastFetched]);

  const handleToggle = async (id) => {
    let found = undefined;
    const mapped = toDoList.map((todo) => {
      if (todo.id === id) {
        return found = { ...todo, isCompleted: !todo.isCompleted };
      }
      else
        return { ...todo };
    });

    setToDoList(mapped);
    
    if (!!found) {
      await axios.patch(`/${id}`, { fields: { Name: found.content, isCompleted: found.isCompleted } })
        .then(console.log);
    }
  }

  const handleSubmit = async (value) => {
    await axios.post("/", { records: [{ fields: { Name: value, isCompleted: false } }] })
      .then(v => {
        setLastFetched(new Date());
        let copy = [...toDoList, ...v.data.records.map(todo => { return { id: todo.id, content: todo.fields.Name, isCompleted: todo.fields.isCompleted }; })];
        // window.location.reload(false);
        // setToDoList(copy);
        console.log(v.data);
      });

    // let copy = [...toDoList, { id: toDoList.length + 1, content: value, isCompleted: false }];
    // setToDoList(copy);
    
  }

  if (isLoading) return <Container>
    <span>Loading...</span>
  </Container>
  return (
    <Container>
      <TodoInput submitHandler={handleSubmit}></TodoInput>
      <TodoList toDoList={toDoList} toggleHandler={handleToggle}></TodoList>
    </Container>
  );
}

export default App;
