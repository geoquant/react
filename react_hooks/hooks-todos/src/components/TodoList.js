import React, { useContext } from "react";
import TodoContext from "../context";
import axios from "axios";

export default function TodoList() {
  const {
    state: { todos },
    dispatch
  } = useContext(TodoContext);

  const title = todos.length > 0 ? `${todos.length} Tasks` : "No Tasks!";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="list-reset text-white p-0">
        {todos.map(todo => (
          <li
            className="flex items-center bg-teal border-black border-solid border-2 my-2 py-4"
            key={todo.id}
          >
            <span
              className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                "line-through text-grey-darkest"}`}
              onClick={() => dispatch({ type: "TOGGLE_TODO", payload: todo })}
            >
              {todo.title}
            </span>
            <button
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <img
                className="h-6"
                src="https://icon.now.sh/edit/0050c5"
                alt="Edit Icon"
              />
            </button>
            <button
              onClick={async () => {
                axios.delete(
                  `https://jsonplaceholder.typicode.com/todos/${todo.id}`
                );
                dispatch({ type: "REMOVE_TODO", payload: todo });
              }}
            >
              <img
                className="h-6"
                src="https://icon.now.sh/delete/8b0000"
                alt="Delete Icon"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
