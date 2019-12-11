import _ from "lodash";
import classnames from "classnames";
import React, { useRef, useContext, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../../context/Context.js";
import pinIcon from "../../../assets/images/pin.png";
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles.module.css";
import { setTodoList } from "../../../utils/datasource.js";

const Todo = SortableElement(({ item }) => {
  const refBtn = useRef();
  const itemRef = useRef();
  const pinRef = useRef();
  const history = useHistory();
  const { todos, setTodos, setPosition, itemSelected } = useContext(Context);

  const handleOpen = e => {
    if (
      !refBtn.current.contains(e.target) &&
      !pinRef.current.contains(e.target)
    ) {
      history.push(`/item/${item.id}`);
    }
  };

  const handleDelete = id => {
    const list = _.omit(todos, id);
    _.remove(list.order, el => el === id);
    setTodoList(list);
    setTodos(list);
  };

  const handlePin = item => {
    const newTodos = {
      ...todos,
      [item.id]: {
        ...item,
        pin: !item.pin
      },
      orderNotPin: todos.orderNotPin.includes(item.id)
        ? _.remove(todos.orderNotPin, i => i !== item.id)
        : [item.id, ...todos.orderNotPin],
      orderPin: todos.orderNotPin.includes(item.id)
        ? [item.id, ...todos.orderPin]
        : _.remove(todos.orderPin, i => i !== item.id)
    };
    setTodoList(newTodos);
    setTodos(newTodos);
  };

  useLayoutEffect(() => {
    if (itemSelected && item.id === itemSelected.id) {
      const info = itemRef.current.getBoundingClientRect();
      const position = {
        width: info.width,
        height: info.height,
        x: info.left,
        y: info.top
      };
      setPosition(position);
    }
  }, [item, itemSelected, setPosition]);

  return (
    <div
      id="todo-item"
      className={classnames(styles.item, {
        [styles.hide]: itemSelected && item.id === itemSelected.id
      })}
      onClick={e => handleOpen(e, item)}
      ref={itemRef}
    >
      <div
        className={classnames(styles.pin, { [styles.show]: item.pin })}
        onClick={() => handlePin(item)}
        ref={pinRef}
      >
        <img src={pinIcon} alt="pin" />
      </div>
      <p className={styles.title}>{item.title}</p>
      <p
        dangerouslySetInnerHTML={{
          __html:
            item.content.length > 1000
              ? item.content.substring(0, 1000) + "..."
              : item.content
        }}
      ></p>
      <div className={styles.btnDelete}>
        <button
          id="btn-delete"
          onClick={() => handleDelete(item.id)}
          ref={refBtn}
        >
          Xoá
        </button>
      </div>
    </div>
  );
});

export default Todo;
