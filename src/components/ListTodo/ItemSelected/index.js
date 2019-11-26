import classnames from "classnames";
import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

const ItemSelected = ({ item, className, close }) => {
  const titleRef = useRef();
  const contentRef = useRef();
  const handleClose = e => {
    if (e.keyCode === 27) {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleClose);
    return () => {
      document.addEventListener("keydown", handleClose);
    };
  });

  useEffect(() => {
    if (item) {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(contentRef.current, 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
      contentRef.current.focus();
    }
  }, [item]);

  if (!item) return null;
  return (
    <div className={classnames(className, styles.container)}>
      <div className={styles.overlay} onClick={close}></div>
      <div className={styles.item}>
        <div
          className={styles.title}
          contentEditable="true"
          data-placeholder="Tiêu đề"
          ref={titleRef}
        >
          {item.title || null}
        </div>
        <div
          className={styles.content}
          contentEditable="true"
          ref={contentRef}
          data-placeholder="Tạo ghi chú..."
        >
          {item.content}
        </div>
        <div className={styles.btnSubmit}>
          <button type="submit">Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default ItemSelected;
