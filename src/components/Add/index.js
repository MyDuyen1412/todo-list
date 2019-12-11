import classnames from "classnames";
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import Context from "../../context/Context.js";
import { getTodoList, setTodoList } from "../../utils/datasource.js";
import styles from "./styles.module.css";

function Add() {
  const [expand, setExpand] = useState(false);
  const searchBox = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const context = useContext(Context);

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      const title = titleRef.current.innerText;
      const content = contentRef.current.innerText;
      if (content !== "") {
        const todoList = getTodoList();
        const orderNotPin = todoList["orderNotPin"] || [];
        const orderPin = todoList["orderPin"] || [];
        const order = [...orderNotPin, ...orderPin];
        const newItem = {
          title: title || null,
          content: content,
          id: order.length > 0 ? Math.max(...order) + 1 : 0,
          pin: false
        };
        const todosNew = {
          ...todoList,
          [newItem.id]: newItem,
          orderNotPin: [newItem.id, ...orderNotPin],
          orderPin: [...orderPin]
        };
        setTodoList(todosNew);
        context.setTodos(todosNew);
        contentRef.current.innerText = "";
        titleRef.current.innerText = "";
      }
      setExpand(false);
    },
    [context]
  );

  const handleClickOutside = useCallback(
    event => {
      if (event.target === document.getElementById("btn-delete")) {
        setExpand(false);
      } else if (
        searchBox.current &&
        !searchBox.current.contains(event.target)
      ) {
        setExpand(false);
        // handleSubmit(event);
      }

      if (event.keyCode === 27) {
        setExpand(false);
        handleSubmit(event);
      }
    },
    [handleSubmit]
  );

  useEffect(() => {
    const node = searchBox.current;
    document.addEventListener("mousedown", handleClickOutside);
    node.addEventListener("keydown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      node.removeEventListener("keydown", handleClickOutside);
    };
  });

  useEffect(() => {
    if (expand) {
      contentRef.current.focus();
    }
  }, [expand]);

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
