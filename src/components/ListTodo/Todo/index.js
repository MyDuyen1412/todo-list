import _ from "lodash";
import classnames from "classnames";
import React, { useRef, useContext, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import Context from "../../../context/Context.js";
import pinIcon from "../../../assets/images/pin.png";
import { SortableElement } from "react-sortable-hoc";
import styles from "./styles.module.css";

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

  const handleDelete = item => {
    const list = _.omit(todos, item.id);
    // const listDelNotPin = _.filter(list.orderNotPin, el => el !== id);
    // const listDelPin = _.filter(list.orderPin, el => el !== id);
    const listDelNotPin = item.pin
      ? list.orderNotPin
      : [
          ...list.orderNotPin.slice(0, item.internalIndex),
          ...list.orderNotPin.slice(
            item.internalIndex + 1,
            list.orderNotPin.length
          )
        ];
    const listDelPin = item.pin
      ? [
          ...list.orderPin.slice(0, item.internalIndex),
          ...list.orderPin.slice(item.internalIndex + 1, list.orderPin.length)
        ]
      : list.orderPin;
    const listNew = {
      ...list,
      orderNotPin: listDelNotPin,
      orderPin: listDelPin
    };
    listDelNotPin.map((item, index) => (listNew[item].internalIndex = index));
    listDelPin.map((item, index) => (listNew[item].internalIndex = index));
    setTodos(listNew);
  };

  const handlePin = item => {
    const newOrderNotPin = item.pin
      ? [...todos.orderNotPin, item.id]
      : _.filter(todos.orderNotPin, i => i !== item.id);
    const newOrderPin = item.pin
      ? _.filter(todos.orderPin, i => i !== item.id)
      : [...todos.orderPin, item.id];
    const newTodos = {
      ...todos,
      [item.id]: {
        ...item,
        pin: !item.pin
      },
      orderNotPin: newOrderNotPin,
      orderPin: newOrderPin
    };
    newOrderNotPin.map((item, index) => (newTodos[item].internalIndex = index));
    newOrderPin.map((item, index) => (newTodos[item].internalIndex = index));
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
        <button id="btn-delete" onClick={() => handleDelete(item)} ref={refBtn}>
          Xoá
        </button>
      </div>
    </div>
  );
});

export default Todo;
