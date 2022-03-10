import ToDoApp from "./todo";
import { ToDoProvider } from "./todo/contexts/todoContext";

function App() {
  return (
    <ToDoProvider>
      <ToDoApp></ToDoApp>
    </ToDoProvider>
  );
}

export default App;
