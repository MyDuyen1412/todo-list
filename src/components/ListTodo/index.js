import _ from "lodash";
import queryString from "query-string";
import React, { useState, useContext, useEffect, useLayoutEffect, useRef } from "react";
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
  const [position, setPosition] = useState();
  const history = useHistory();
  const location = useLocation();
  const { id } = queryString.parse(location.search);
  const containerRef = useRef();

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
    } else setOpen(false);
  }, [id, todos]);

  const handleClose = () => {
    setOpen(false);
    history.push("/");
  };
  useLayoutEffect(() => {
    const position = [];
  // var x = getOffset( document.getElementById('yourElId') ).left; 
    Array.from(containerRef.current.children[0].children).map(child => {
      const info = child.getBoundingClientRect();
      return position.push({
        width: info.width,
        height: info.height,
        x: info.left,
        y: info.top
      });
    });
    setPosition(position);
  }, [todos]);
  return (
    <>
      <div className="listTodo" ref={containerRef}>
        <ListGrid colWidth="300px">
          {Object.values(todos)
            .reverse()
            .map(item => (
              <Todo
                key={item.id}
                item={item}
                open={openItem}
                handleDelete={handleDelete}
                hide={open && item.id === itemselected.id}
              />
            ))}
        </ListGrid>
      </div>
      {position &&
        Object.values(todos)
          .reverse()
          .map((item, index) => (
            <ItemSelected
              key={item.id}
              item={item}
              close={handleClose}
              open={open && item.id === itemselected.id}
              position={position[index]}
              index={index}
            />
          ))}
    </>
  );
}

export default ListTodo;
