import _ from "lodash";
import classnames from "classnames";
import React, { useContext } from "react";
import Context from "../../context/Context.js";
import { useHistory } from "react-router-dom";
import { setTodoList, getTodoPin, getTodoNotPin } from "../../utils/datasource.js";
import Todo from "./Todo";
import Masonry from "react-masonry-component";
import styles from "./styles.module.css";

function ListTodo() {
  const { todos, setTodos } = useContext(Context);
  const history = useHistory();

  const handleDelete = id => {
    setTodoList(_.omit(todos, id));
    setTodos(_.omit(todos, id));
  };

  const openItem = item => {
    history.push(`/item/${item.id}`);
  };

  const handlePin = item => {
    const newTodos = {
      ...todos,
      [item.id]: {
        ...item,
        pin: !item.pin
      }
    };
    setTodoList(newTodos);
    setTodos(newTodos);
  };

  // const listNotPin = getTodoNotPin()
  // const listPin = getTodoPin()
  const listNotPin = Object.values(todos)
    .reverse()
    .filter(item => !item.pin);
  const listPin = Object.values(todos)
    .reverse()
    .filter(item => item.pin);

  return (
    <>
    {/* <Masonry className={styles.list}>
        {Object.values(todos)
          .reverse()
          .map(item => (
            <div key={item.id} className={styles.container}>
              <Todo
                item={item}
                open={openItem}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </Masonry> */}
      <div
        className={classnames(styles.listPin, {
          [styles.show]: listPin.length > 0
        })}
      >
        <p className={styles.title}>PINNED</p>
        <Masonry className={styles.list}>
          {listPin.map(item => (
            <div key={item.id} className={styles.container}>
              <Todo
                item={item}
                open={openItem}
                handleDelete={handleDelete}
                handlePin={handlePin}
              />
            </div>
          ))}
        </Masonry>
      </div>
      <div
        className={classnames(styles.listNotPin, {
          [styles.show]: listNotPin.length > 0
        })}
      >
        {listPin.length > 0 && <p className={styles.title}>OTHERS</p>}
        <Masonry className={styles.list}>
          {listNotPin.map(item => (
            <div key={item.id} className={styles.container}>
              <Todo
                item={item}
                open={openItem}
                handleDelete={handleDelete}
                handlePin={handlePin}
              />
            </div>
          ))}
        </Masonry>
      </div>
    </>
  );
}

export default ListTodo;
