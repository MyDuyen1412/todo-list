import React, { useState } from "react";
import Context from '../context/Context';
import {getTodoList} from '../utils/datasource.js'

function AppProvider({ children }) {
  const [todos, setTodos] = useState(getTodoList())
  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default AppProvider;
