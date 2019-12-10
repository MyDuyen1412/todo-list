import _ from "lodash";
import classnames from "classnames";
import React, { useContext, useRef, useEffect } from "react";
import Context from "../../context/Context.js";
import { useHistory } from "react-router-dom";
import {
  setTodoList,
  getTodoPin,
  getTodoNotPin
} from "../../utils/datasource.js";
import Todo from "./Todo";
import Masonry from "react-masonry-component";
// import {
//   GridContextProvider,
//   GridDropZone,
//   GridItem,
//   swap,
//   move
// } from "react-grid-dnd";
import Muuri from "muuri";
import styles from "./styles.module.css";

function ListTodo() {
  const { todos, setTodos } = useContext(Context);
  const history = useHistory();
  const ref = useRef();

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

  // useEffect(() => {
  //   Muuri.defaultOptions.dragEnabled = true;
  //   Muuri.defaultOptions.layoutDuration =  600
  //   new Muuri(ref.current);
  // }, [todos]);

  // const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
  //   const nextState = swap(
  //     Object.values(todos),
  //     sourceIndex,
  //     targetIndex
  //   );
  //   var obj = nextState.reduce(function(acc, cur, i) {
  //     acc[i] = cur;
  //     return acc;
  //   }, {});
  //   setTodos(obj);
  //   // setItems(nextState);
  // };

  // console.log(todos);

  return (
    // <GridContextProvider onChange={onChange}>
    //   <GridDropZone
    //     id="items"
    //     boxesPerRow={4}
    //     rowHeight={100}
    //     style={{ height: "400px" }}
    //   >
    //     {Object.values(todos)
    //       .reverse()
    //       .map(item => (
    //         <GridItem key={item.id}>
    //           <div
    //             style={{
    //               width: "100%",
    //               // height: "100%"
    //             }}
    //           >
    //             <Todo item={item} open={openItem} handleDelete={handleDelete} />
    //           </div>
    //         </GridItem>
    //       ))}
    //   </GridDropZone>
    // </GridContextProvider>
    <>
      {/* <div className={styles.grid} ref={ref}>
        {Object.values(todos)
          .reverse()
          .map(item => (
            <div key={item.id} className={classnames(styles.container,styles.item)}>
              <div className={styles["item-content"]}>
                <Todo item={item} open={openItem} handleDelete={handleDelete} handlePin={handlePin}/>
              </div>
            </div>
          ))}
      </div> */}
      {/* <Masonry className={styles.list}>
        {Object.values(todos)
          .reverse()
          .map(item => (
            <div key={item.id} className={styles.container}>
              <Todo
                item={item}
                open={openItem}
                handleDelete={handleDelete}
                handlePin={handlePin}
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
