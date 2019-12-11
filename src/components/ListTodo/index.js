import arrayMove from "array-move";
import classnames from "classnames";
import React, { useContext } from "react";
import Context from "../../context/Context.js";
import { setTodoList } from "../../utils/datasource.js";
import List from "./List";
import styles from "./styles.module.css";

const ListTodo = () => {
  const { todos, setTodos } = useContext(Context);
  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrder = arrayMove(todos.order, oldIndex, newIndex);
    const newTodos = { ...todos, order: newOrder };
    setTodoList(newTodos);
    setTodos(newTodos);
  };

  const listNotPin = todos.order.filter(item => !todos[item].pin);
  const listPin = todos.order.filter(item => todos[item].pin);
  if (!todos.order) return null;

  return (
    <>
      <div
        className={classnames(styles.listPin, {
          [styles.show]: listPin.length > 0
        })}
      >
        <p className={styles.title}>PINNED</p>
        <List items={listPin} onSortEnd={onSortEnd} pressDelay={10} axis="xy" />
      </div>
      <div
        className={classnames(styles.listNotPin, {
          [styles.show]: listNotPin.length > 0
        })}
      >
        {listPin.length > 0 && <p className={styles.title}>OTHERS</p>}
        <List
          items={listNotPin}
          onSortEnd={onSortEnd}
          pressDelay={10}
          axis="xy"
        />
      </div>
    </>
  );
};

export default ListTodo;
