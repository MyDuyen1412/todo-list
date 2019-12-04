import classnames from "classnames";
import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback
} from "react";
import Context from "../../../context/Context.js";
import { setTodoList } from "../../../utils/datasource.js";
import "./styles.css";

const ItemSelected = ({ history, match }) => {
  const { id } = match.params;
  const titleRef = useRef();
  const contentRef = useRef();
  const {
    todos,
    setTodos,
    position,
    setItemSelected,
    itemSelected
  } = useContext(Context);
  const [openDelay, setOpenDelay] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setItemSelected(todos[parseInt(id)]);
  }, [id, setItemSelected, todos]);

  const close = useCallback(() => {
    // history.push("/");
    setOpenDelay(false);
    setHide(true);
    setTimeout(() => {
      history.push("/");
      setItemSelected();
    }, 300);
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
    document.addEventListener("keydown", handleClose);
    return () => {
      document.removeEventListener("keydown", handleClose);
    };
  });

  useEffect(() => {
    if (itemSelected) {
      document.querySelector(
        `.itemSelected__container .itemSelected__item`
      ).style.transform = `translate(calc(${position.x}px - 100% - 118px), calc(${position.y}px - 100px))`;
      document.querySelector(
        `.itemSelected__container .itemSelected__item`
      ).style.width = `${position.width}px`;
      document.querySelector(
        `.itemSelected__container .itemSelected__item`
      ).style.height = `${position.height}px`;
    }
  }, [itemSelected, position]);

  useEffect(() => {
    if (itemSelected) {
      var range = document.createRange();
      var sel = window.getSelection();
      range.setStart(contentRef.current, 1);
      sel.removeAllRanges();
      sel.addRange(range);
      contentRef.current.focus();
    }
  });

  const handleSubmit = event => {
    event.preventDefault();
    const title = titleRef.current.innerText;
    const content = contentRef.current.innerText;
    todos[itemSelected.id].title = title || null;
    todos[itemSelected.id].content = content;
    // localStorage.setItem("todoList", JSON.stringify(todos));
    setTodoList(todos);
    setTodos(todos);
    close();
  };

  if (!itemSelected) return null;

  return (
    <div
      id="itemSelected"
      className={classnames("itemSelected__container", {
        itemSelected__open: openDelay,
        itemSelected__hide: hide
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
            {itemSelected.title || null}
          </div>
          <div
            className="itemSelected__content"
            contentEditable="true"
            ref={contentRef}
            suppressContentEditableWarning={true}
            data-placeholder="Tạo ghi chú..."
            dangerouslySetInnerHTML={{ __html: itemSelected.content }}
          ></div>
          <div className="itemSelected__btnSubmit">
            <button type="submit">Đóng</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemSelected;
