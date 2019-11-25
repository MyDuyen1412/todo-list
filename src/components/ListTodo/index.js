import React, { useContext, useState } from "react";
import Context from "../../context/Context.js";
import { getTodoList } from "../../utils/datasource.js";

function ListTodo() {
  const { todos } = useContext(Context);
  //   useEffect(() => {
  //     let todoList = getTodoList();
  //     getTodos(todoList).then(todos => setTodos(todos));
  //   }, [localStorage.getItem("todoList")]);
  console.log(todos);
  return (
    <div>
      {todos.map(item => (
        <p> {item.content}</p>
      ))}
    </div>
  );
}

export default ListTodo;
