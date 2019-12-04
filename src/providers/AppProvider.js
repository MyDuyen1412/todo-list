import React, { useState } from "react";
import Context from '../context/Context';
import {getTodoList} from '../utils/datasource.js'

function AppProvider({ children }) {
  const [todos, setTodos] = useState(getTodoList())
  const [position, setPosition] = useState([])
  return (
    <Context.Provider
      value={{
        todos,
        position,
        setTodos,
        setPosition
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppProvider;
