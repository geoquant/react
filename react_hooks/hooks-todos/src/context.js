import React from "react";

const TodoContext = React.createContext({
  todos: [
    // { id: 1, text: "Eat breakfast", complete: false },
    // { id: 2, text: "Go to the gym", complete: false },
    // { id: 3, text: "Study React hooks", complete: true }
  ],
  currentTodo: {}
});

export default TodoContext;
