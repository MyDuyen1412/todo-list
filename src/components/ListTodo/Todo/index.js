import _ from "lodash";
import classnames from "classnames";
import React, { useRef, useContext } from "react";
import Context from "../../../context/Context.js";
import styles from "./styles.module.css";

const Todo = ({ item, open, handleDelete, hide }) => {
  const ref = useRef();
  const itemRef = useRef();
  const { setPosition } = useContext(Context);

  const handleOpen = (e) => {
    if (!ref.current.contains(e.target)) {
      open(item);
    }
  };

  const loadPosition = _.debounce(() => {
    const info = itemRef.current.getBoundingClientRect();
    const position = {
      width: info.width,
      height: info.height,
      x: info.left,
      y: info.top
    };
    setPosition(position);
  }, 200);

  // useEffect(() => {
  //   const el = itemRef.current;
  //   el.addEventListener("mouseenter", _.debounce(loadPosition, 300));

  //   return () => {
  //     el.removeEventListener("mouseenter", loadPosition);
  //   };
  // }, [loadPosition]);
  return (
    <div
      id="todo-item"
      className={classnames(styles.item, { [styles.hide]: hide })}
      onClick={e => handleOpen(e, item)}
      ref={itemRef}
      onMouseEnter={loadPosition}
    >
      <p>{item.title}</p>
      <p dangerouslySetInnerHTML={{__html: item.content}}></p>
      <div className={styles.btnDelete}>
        <button id="btn-delete" onClick={() => handleDelete(item.id)} ref={ref}>
          Xoá
        </button>
      </div>
    </div>
  );
};

export default Todo;
