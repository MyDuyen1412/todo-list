import _ from "lodash";
import queryString from "query-string";
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect
} from "react";
import Context from "../../context/Context.js";
import { useHistory, useLocation } from "react-router-dom";
import ListGrid from "../ListGrid";
import Todo from "./Todo";
import ItemSelected from "./ItemSelected";
import {
  CSSGrid,
  measureItems,
  makeResponsive,
  layout,
  enterExitStyle
} from "react-stonecutter";

// import {
//   GridContextProvider,
//   GridDropZone,
//   GridItem,
//   swap
// } from "react-grid-dnd";

function ListTodo() {
  const { todos, setTodos, position } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [itemselected, setItemSelected] = useState();
  const history = useHistory();
  const location = useLocation();
  const { id } = queryString.parse(location.search);
  // const [position, setPosition] = useState();

  const { enter, entered, exit } = enterExitStyle.foldUp;

  const Grid = makeResponsive(measureItems(CSSGrid), {
    maxWidth: 1920,
    defaultColumns: 4
  });

  const handleDelete = id => {
    localStorage.setItem("todoList", JSON.stringify(_.omit(todos, id)));
    setTodos(_.omit(todos, id));
  };

  const openItem = (item) => {
    // setPosition(position)
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
  }

  // const [items, setItems] = React.useState(Object.values(todos).reverse());

  // const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
  //   const nextState = swap(items, sourceIndex, targetIndex);
  //   setItems(nextState);
  // };
  return (
    <>
      <div className="listTodo">
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
      {/* <GridContextProvider onChange={onChange}>
        <GridDropZone
          id="items"
          boxesPerRow={4}
          rowHeight={100}
          style={{ height: "300px" }}
        >
          {items.map(item => (
            <GridItem key={item.id}>
              <div
                style={{
                  width: "100%",
                  height: "100%"
                }}
              >
                <Todo
                  // key={item.id}
                  item={item}
                  open={openItem}
                  handleDelete={handleDelete}
                  hide={open && item.id === itemselected.id}
                />
              </div>
            </GridItem>
          ))}
        </GridDropZone>
      </GridContextProvider> */}
      {/* <Grid
        // columns={4}
        columnWidth={300}
        gutterWidth={15}
        gutterHeight={15}
        layout={layout.pinterest}
        duration={800}
        easing="ease-out"
        enter={enter}
        entered={entered}
        exit={exit}
      >
        {Object.values(todos)
          .reverse()
          .map(item => (
            <div key={item.id} style={{ width: "300px" }}>
              <Todo
                item={item}
                open={openItem}
                handleDelete={handleDelete}
                hide={open && item.id === itemselected.id}
              />
            </div>
          ))}
      </Grid> */}
      <ItemSelected
        item={itemselected}
        close={handleClose}
        open={open}
        position={position}
      />
    </>
  );
}

export default ListTodo;
