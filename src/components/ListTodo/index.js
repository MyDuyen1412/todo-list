import arrayMove from "array-move";
import classnames from "classnames";
import React, { useContext, useCallback } from "react";
import Context from "../../context/Context.js";
import List from "./List";
import styles from "./styles.module.css";

const ListTodo = () => {
  const { todos, setTodos } = useContext(Context);
  const onSortEnd = useCallback((oldIndex, newIndex, order, type) => {
    const newOrder = arrayMove(order, oldIndex, newIndex);
    const newTodos = {
      ...todos,
      orderPin: type === "pin" ? newOrder : todos.orderPin,
      orderNotPin: type === "not-pin" ? newOrder : todos.orderNotPin
    };
    newOrder.map((item, index) => (newTodos[item].internalIndex = index));
    setTodos(newTodos);
  }, [setTodos, todos]);

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
          onSortEnd={({ oldIndex, newIndex }) =>
            onSortEnd(oldIndex, newIndex, todos.orderPin, "pin")
          }
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
          // onSortEnd={onSortEnd}
          onSortEnd={({ oldIndex, newIndex }) =>
            onSortEnd(oldIndex, newIndex, todos.orderNotPin, "not-pin")
          }
          pressDelay={10}
          axis="xy"
        />
      </div>
    </>
  );
};

export default ListTodo;
