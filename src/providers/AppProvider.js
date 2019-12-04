import React, { useState } from "react";
import Context from '../context/Context';
import {getTodoList} from '../utils/datasource.js'

function AppProvider({ children }) {
  const [todos, setTodos] = useState(getTodoList())
  const [position, setPosition] = useState([])
  const [itemSelected, setItemSelected] = useState()
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
