import uuidv4 from "uuid/v4";

export default function TodoReducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      if (!action.payload) {
        return state;
      }
      if (state.todos.findIndex(t => t.title === action.payload) > -1) {
        // findIndex returns an integer. we convert the integer to boolean with
        // the '> -1'
        return state;
      }
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      };
      const addedTodos = [...state.todos, newTodo];
      return {
        ...state,
        todos: addedTodos
      };
    case "GET_TODOS":
      return { ...state, todos: action.payload };
    case "TOGGLE_TODO":
      const toggleTodo = state.todos.map(t =>
        t.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : t
      );
      return {
        ...state,
        todos: toggleTodo
      };
    case "UPDATE_TODO":
      if (!action.payload) {
        return state;
      }
      if (state.todos.findIndex(t => t.title === action.payload) > -1) {
        // findIndex returns an integer. we convert the integer to boolean with
        // the '> -1'
        return state;
      }
      const updatedTodo = { ...state.currentTodo, text: action.payload };
      const updateTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, updateTodoIndex),
        updatedTodo,
        ...state.todos.slice(updateTodoIndex + 1)
      ];
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    case "REMOVE_TODO":
      const filterTodo = state.todos.filter(t => t.id !== action.payload.id);
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return { ...state, currentTodo: isRemovedTodo, todos: filterTodo };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    default:
      return state;
  }
}
