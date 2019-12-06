import _ from "lodash";
import React, { useContext } from "react";
import Context from "../../context/Context.js";
import { useHistory } from "react-router-dom";
import { setTodoList } from "../../utils/datasource.js";
import Todo from "./Todo";
import Masonry from 'react-masonry-component';
import styles from './styles.module.css'

function ListTodo() {
  const { todos, setTodos } = useContext(Context);
  const history = useHistory();

  const handleDelete = id => {
    setTodoList(_.omit(todos, id));
    // localStorage.setItem("todoList", JSON.stringify(_.omit(todos, id)));
    setTodos(_.omit(todos, id));
  };

  const openItem = item => {
    history.push(`/item/${item.id}`);
  };
  return (
    <>
      <Masonry className={styles.list}>
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
      </Masonry>
    </>
  );
}

export default ListTodo;
