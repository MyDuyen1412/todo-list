import classnames from "classnames";
import React, { useRef } from "react";
import styles from "./styles.module.css";

const Todo = ({ item, open, handleDelete, hide }) => {
  const ref = useRef();
  const itemRef = useRef()
  const handleOpen = (e, item) => {
    if (!ref.current.contains(e.target)) {
      open(item);
    }
  };
  return (
    <div
      className={classnames(styles.item, { [styles.hide]: hide })}
      onClick={e => handleOpen(e, item)}
      ref={itemRef}
    >
      <p>{item.title}</p>
      <p>{item.content}</p>
      <div className={styles.btnDelete}>
        <button onClick={() => handleDelete(item.id)} ref={ref}>
          Xoá
        </button>
      </div>
    </div>
  );
};

export default Todo;
