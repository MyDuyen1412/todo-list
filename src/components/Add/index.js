import classnames from "classnames";
import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../../context/Context.js";
import { getTodoList } from "../../utils/datasource.js";
import styles from "./styles.module.css";

function Add() {
  const [expand, setExpand] = useState(false);
  const searchBox = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const context = useContext(Context);

  const handleClickOutside = event => {
    if (searchBox.current && !searchBox.current.contains(event.target)) {
      setExpand(false);
      // handleSubmit(event)
    }
    if (event.keyCode === 27) {
      setExpand(false);
      // handleSubmit(event)
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

  useEffect(() => {
    if (expand) {
      contentRef.current.focus();
    }
  }, [expand]);

  const handleSubmit = async event => {
    event.preventDefault();
    const title = titleRef.current.innerText;
    const content = contentRef.current.innerText;
    const todos = Object.values(getTodoList());
    const newItem = {
      title: title || null,
      content: content,
      id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 0
    };
    const todosNew = { [newItem.id]: newItem, ...getTodoList() };
    localStorage.setItem("todoList", JSON.stringify(todosNew));
    context.setTodos(todosNew);
    contentRef.current.innerText = "";
    titleRef.current.innerText = "";
    setExpand(false);
  };

  return (
    <div className={styles.container} ref={searchBox}>
      <div
        className={classnames(styles.box, { [styles.hidden]: expand })}
        onClick={() => setExpand(true)}
      >
        <span>Tạo ghi chú...</span>
      </div>
      <div
        className={classnames(styles["search-box"], {
          [styles.expand]: expand
        })}
      >
        <form name="todo" id="todo" onSubmit={handleSubmit}>
          <div
            className={styles.title}
            id="title"
            ref={titleRef}
            contentEditable="true"
            data-placeholder="Tiêu đề"
          ></div>
          <div
            className={styles.content}
            id="content"
            ref={contentRef}
            contentEditable="true"
            data-placeholder="Tạo ghi chú..."
          ></div>
          <div className={styles.btnSubmit}>
            <button type="submit">Đóng</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
