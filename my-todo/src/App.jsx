import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [message, setMessage] = useState([]);

  const [todo, setTodo] = useState();

  const api = async () => {
    const call = await fetch("http://localhost:5000/todos");
    const data = await call.json();
    setMessage(data);
  };

  const add = async () => {
    const call = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ todo }),
    });
    const data = await call.json();
    setMessage(data);
    console.log("dsdada", data);
  };

  useEffect(() => {
    api();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button onClick={add}> Add</button>
        <div>
          <p>{message.Todo}</p>
          <p>{message.Completed}</p>
        </div>
        );
      </div>
    </>
  );
}

export default App;
