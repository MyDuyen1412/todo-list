import React, { useState } from "react";
import Context from '../context/Context';
import {getTodoList, setTodoList} from '../utils/datasource.js'

function AppProvider({ children }) {
  const [todos, setTodosWithNoSaveLocalStorage] = useState(getTodoList())
  const [position, setPosition] = useState([])
  const [itemSelected, setItemSelected] = useState()
  const setTodos = (todos) => {
    setTodosWithNoSaveLocalStorage(todos);
    setTodoList(todos)
  }
  return (
    <Context.Provider
      value={{
        todos,
        position,
        itemSelected,
        setTodos,
        setPosition,
        setItemSelected
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppProvider;
