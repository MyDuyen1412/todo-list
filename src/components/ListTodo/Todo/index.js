import React from "react";
import styles from "./styles.module.css";

const Todo = ({ item, open, handleDelete }) => {
  return (
    <div className={styles.item} onClick={() => open(item)}>
      <p>{item.title}</p>
      <p>{item.content}</p>
      <div className={styles.btnDelete}>
        <button onClick={() => handleDelete(item.id)}>Xoá</button>
      </div>
    </div>
  );
};

export default Todo;
