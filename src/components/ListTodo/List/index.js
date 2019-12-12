import React, { useContext } from "react";
import Masonry from "react-masonry-component";
import Todo from "../Todo";
import Context from "../../../context/Context.js";
import { SortableContainer } from "react-sortable-hoc";
import styles from "./styles.module.css";

const List = SortableContainer(({ items }) => {
  const { todos } = useContext(Context);

  return (
    <Masonry>
      {items.map((item, index) => (
        <div key={`item-${index}`} className={styles.container}>
          <Todo index={index} item={todos[item]} />
        </div>
      ))}
    </Masonry>
  );
});

export default List;
