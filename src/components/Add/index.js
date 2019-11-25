import classnames from "classnames";
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getTodoList } from "../../utils/datasource.js";
import styles from "./styles.module.css";

// const addTodo = (todoList, newTodo) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       todoList = [...todoList, newTodo];
//       resolve(todoList);
//     }, 500);
//   });
// };
function Add() {
  const [expand, setExpand] = useState(false);
  const searchBox = useRef();

  const handleClickOutside = event => {
    if (searchBox.current && !searchBox.current.contains(event.target)) {
      setExpand(false);
    }
    if (event.keyCode === 27) {
      setExpand(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleClickOutside);
    };
  });
  //   const [todos, setTodos] = useState();
  //   const history = useHistory();
  //   const input = React.createRef();

  //   const handleSubmit = async event => {
  //     event.preventDefault();
  //     let todoList = getTodoList();

  //     const text = input.current.value;

  //     const newItem = {
  //       text: text,
  //       click: false,
  //       id: todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 0
  //     };

  //     const todos = await addTodo(todoList, newItem);

  //     localStorage.setItem("todoList", JSON.stringify(todos));
  //     input.current.value = "";
  //     input.current.focus();
  //     setTodos(todos);
  //     history.push("/" + newItem.id);
  //   };
  return (
    <div className={styles.container} ref={searchBox}>
      <div
        className={classnames(styles.box, { [styles.hidden]: expand })}
        onClick={() => setExpand(true)}
      >
        <span>Tạo ghi chú</span>
      </div>
      <div
        className={classnames(styles["search-box"], {
          [styles.expand]: expand
        })}
      >
        <form name="todo" id="todo">
          <input type="text" placeholder='Tiêu đề' className={styles.title}/>
          <input type="text" placeholder='tạo ghi chú' ref={input => input && input.focus()}/>
          <button type="submit">Đóng</button>
        </form>
      </div>
    </div>
    // <div className="form">
    //   <form name="todo" id="todo">
    //     <input type="text" id="input" name="todoName" />
    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
}

export default Add;
