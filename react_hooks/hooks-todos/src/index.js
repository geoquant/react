import React, { useContext, useReducer, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import * as serviceWorker from "./serviceWorker";

// import App from "./AppContextCounter";
import TodoContext from "./context";
import TodoReducer from "./reducer";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(endpoint);
    setData(response.data.slice(0, 5));
  };

  return data;
};

const App = () => {
  const initialState = useContext(TodoContext);
  const [state, dispatch] = useReducer(TodoReducer, initialState);
  const savedTodos = useAPI("https://jsonplaceholder.typicode.com/todos");

  useEffect(() => {
    dispatch({
      type: "GET_TODOS",
      payload: savedTodos
    });
  }, [savedTodos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      <TodoList />
      <TodoForm />
    </TodoContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
