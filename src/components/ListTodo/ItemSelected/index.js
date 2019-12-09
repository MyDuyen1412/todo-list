import classnames from "classnames";
import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
  useLayoutEffect
} from "react";
import Context from "../../../context/Context.js";
import { setTodoList } from "../../../utils/datasource.js";
import pinIcon from "../../../assets/images/pin.png";
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

    const newTodos = {
      ...todos,
      [itemSelected.id] : itemSelected
    }
    setTodoList(newTodos);
    setTodos(newTodos);

    setOpenDelay(false);
    setHide(true);
    setTimeout(() => {
      setItemSelected();
      history.push("/");
    }, 300);

  }, [history, itemSelected, setItemSelected, setTodos, todos]);

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

  useLayoutEffect(() => {
    if (itemSelected) {
      document.querySelector(
        `.itemSelected__container .itemSelected__item`
      ).style.left = `${position.x}px`;
      document.querySelector(
        `.itemSelected__container .itemSelected__item`
      ).style.top = `${position.y}px`;
      document.querySelector(
        `.itemSelected__container .itemSelected__item`
      ).style.margin = `0`;
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
      const range = document.createRange();
      const sel = window.getSelection();
      const count = contentRef.current.innerHTML
        .replace(/\n$/gm, "")
        .split(/\n/).length;
      range.setStart(contentRef.current, count);
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
    setTodoList(todos);
    setTodos(todos);
    close();
  };

  const handlePin = () => {
    const newTodo = {
      ...itemSelected, pin: !itemSelected.pin
    }
    setItemSelected(newTodo)
  };

  if (!itemSelected) return null;

  return (
    <div
      id="itemSelected"
      className={classnames("itemSelected__container", {
        itemSelected__open: openDelay,
        itemSelected__hide: hide
      })}
      onKeyDown={handleClose}
    >
      <div className="itemSelected__overlay" onClick={close}></div>
      <div className="itemSelected__item">
        <form name="todo" id="todo" onSubmit={handleSubmit}>
          <div
            className={classnames("itemSelected__pin", {
              "itemSelected__pin-show": itemSelected.pin
            })}
            onClick={handlePin}
          >
            <img src={pinIcon} alt="pin" />
          </div>
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
