import React, { useState, useContext, useEffect } from "react";
import TodoContext from "../context";

export default function TodoForm() {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodoContext);

  useEffect(() => {
    if (currentTodo.title) {
      setTodo(currentTodo.title);
    } else {
      setTodo("");
    }
  }, [currentTodo.id]);

  const handleSubmit = event => {
    event.preventDefault();
    if (currentTodo.title) {
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      dispatch({ type: "ADD_TODO", payload: todo });
    }
    setTodo("");
  };

  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
        placeholder={"Add a task ✏️"}
        style={{ textAlign: "center", fontSize: "24px" }}
      />
    </form>
  );
}
