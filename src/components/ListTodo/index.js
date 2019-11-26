import _ from "lodash";
import classnames from "classnames";
import queryString from "query-string";
import React, { useState, useContext, useEffect } from "react";
import Context from "../../context/Context.js";
import { useHistory, useLocation } from "react-router-dom";
import ListGrid from "../ListGrid";
import Todo from "./Todo";
import ItemSelected from "./ItemSelected";
import styles from "./styles.module.css";

function ListTodo() {
  const { todos, setTodos } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [itemselected, setItemSelected] = useState();
  const history = useHistory();
  const location = useLocation();
  const { id } = queryString.parse(location.search);

  const handleDelete = id => {
    localStorage.setItem("todoList", JSON.stringify(_.omit(todos, id)));
    setTodos(_.omit(todos, id));
  };

  const openItem = item => {
    history.push(`?id=${item.id}`);
  };

  useEffect(() => {
    if (id) {
      setOpen(true);
      setItemSelected(todos[parseInt(id)]);
    }
    else setOpen(false)
  }, [id, todos]);
  
  const handleClose = () => {
    setOpen(false)
    history.push('/')
  }

  return (
    <>
      <ListGrid colWidth="300px">
        {Object.values(todos)
          .reverse()
          .map(item => (
            <Todo
              key={item.id}
              item={item}
              open={openItem}
              handleDelete={handleDelete}
            />
          ))}
      </ListGrid>

      <ItemSelected
        item={itemselected}
        className={classnames(styles.modal, { [styles.open]: open })}
        close={handleClose}
      />
    </>
  );
}

export default ListTodo;
