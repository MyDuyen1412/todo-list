import classnames from "classnames";
import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback
} from "react";
import Context from "../../../context/Context.js";
import "./styles.css";

const ItemSelected = ({ location, history }) => {
  const { item } = location.state;
  const titleRef = useRef();
  const contentRef = useRef();
  const { todos, setTodos, position, setItemSelected } = useContext(Context);
  const [openDelay, setOpenDelay] = useState(false);

  const close = useCallback(() => {
    history.push("/");
    setItemSelected();
  }, [history, setItemSelected]);

  const handleClose = useCallback(
    e => {
      // escape key
      if (e.keyCode === 27) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    setTimeout(() => setOpenDelay(true), 0);
  }, []);

  useEffect(() => {
    setItemSelected(item);
  }, [item, setItemSelected]);

  useEffect(() => {
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  });

  useEffect(() => {
    document.querySelector(
      `.itemSelected__container .itemSelected__item`
    ).style.transform = `translate(calc(${position.x}px - 100% - 100px), calc(${position.y}px - 100px))`;
    document.querySelector(
      `.itemSelected__container .itemSelected__item`
    ).style.width = `${position.width}px`;
    document.querySelector(
      `.itemSelected__container .itemSelected__item`
    ).style.height = `${position.height}px`;
  }, [position]);

  useEffect(() => {
    if (item) {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(contentRef.current, 1);
      sel.removeAllRanges();
      sel.addRange(range);
      contentRef.current.focus();
    }
  }, [item]);

  const handleSubmit = event => {
    event.preventDefault();
    const title = titleRef.current.innerText;
    const content = contentRef.current.innerText;
    todos[item.id].title = title || null;
    todos[item.id].content = content;
    localStorage.setItem("todoList", JSON.stringify(todos));
    setTodos(todos);
    close();
  };
  return (
    <div
      id="itemSelected"
      className={classnames("itemSelected__container", {
        itemSelected__open: openDelay
      })}
    >
      <div className="itemSelected__overlay" onClick={close}></div>
      <div className="itemSelected__item">
        <form name="todo" id="todo" onSubmit={handleSubmit}>
          <div
            className="itemSelected__title"
            contentEditable="true"
            data-placeholder="Tiêu đề"
            suppressContentEditableWarning={true}
            ref={titleRef}
          >
            {item.title || null}
          </div>
          <div
            className="itemSelected__content"
            contentEditable="true"
            ref={contentRef}
            suppressContentEditableWarning={true}
            data-placeholder="Tạo ghi chú..."
            dangerouslySetInnerHTML={{ __html: item.content }}
          >
          </div>
          <div className="itemSelected__btnSubmit">
            <button type="submit">Đóng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemSelected;
