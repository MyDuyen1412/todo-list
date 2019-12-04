import _ from "lodash";
import React, { useContext } from "react";
import Context from "../../context/Context.js";
import { useHistory } from "react-router-dom";
import { setTodoList } from "../../utils/datasource.js";
import Todo from "./Todo";
import {
  CSSGrid,
  measureItems,
  makeResponsive,
  layout,
  enterExitStyle
} from "react-stonecutter";

function ListTodo() {
  const { todos, setTodos, itemSelected } = useContext(Context);
  const history = useHistory();

  const { enter, entered, exit } = enterExitStyle.foldUp;

  const Grid = makeResponsive(measureItems(CSSGrid), {
    maxWidth: 1920,
    defaultColumns: 4
  });

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
      <Grid
        columnWidth={300}
        gutterWidth={15}
        gutterHeight={15}
        layout={layout.pinterest}
        duration={800}
        easing="ease-out"
        enter={enter}
        entered={entered}
        exit={exit}
        style={{ margin: "0 auto" }}
      >
        {Object.values(todos)
          .reverse()
          .map(item => (
            <div key={item.id} style={{ width: "300px" }}>
              <Todo
                item={item}
                open={openItem}
                handleDelete={handleDelete}
                hide={itemSelected && item.id === itemSelected.id}
              />
            </div>
          ))}
      </Grid>
    </>
  );
}

export default ListTodo;
