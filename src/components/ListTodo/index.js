import arrayMove from "array-move";
import classnames from "classnames";
import React, { useContext } from "react";
import Context from "../../context/Context.js";
import { setTodoList } from "../../utils/datasource.js";
import List from "./List";
import styles from "./styles.module.css";

const ListTodo = () => {
  const { todos, setTodos } = useContext(Context);
  const onSortEndNotPin = ({ oldIndex, newIndex }) => {
    const newOrderNotPin = arrayMove(todos.orderNotPin, oldIndex, newIndex);
    const newTodos = {
      ...todos,
      orderNotPin: newOrderNotPin
    };
    setTodoList(newTodos);
    setTodos(newTodos);
  };

  const onSortEndPin = ({ oldIndex, newIndex }) => {
    const newOrderPin = arrayMove(todos.orderPin, oldIndex, newIndex);
    const newTodos = {
      ...todos,
      orderPin: newOrderPin
    };
    setTodoList(newTodos);
    setTodos(newTodos);
  };

  if (!todos.orderNotPin || !todos.orderPin) return null;

  return (
    <>
      <div
        className={classnames(styles.listPin, {
          [styles.show]: todos.orderPin.length > 0
        })}
      >
        <p className={styles.title}>PINNED</p>
        <List
          items={todos.orderPin}
          onSortEnd={onSortEndPin}
          pressDelay={10}
          axis="xy"
        />
      </div>
      <div
        className={classnames(styles.listNotPin, {
          [styles.show]: todos.orderNotPin.length > 0
        })}
      >
        {todos.orderPin.length > 0 && <p className={styles.title}>OTHERS</p>}
        <List
          items={todos.orderNotPin}
          onSortEnd={onSortEndNotPin}
          pressDelay={10}
          axis="xy"
        />
      </div>
    </>
  );
};

export default ListTodo;
