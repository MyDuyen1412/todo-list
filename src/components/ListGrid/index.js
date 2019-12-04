import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback
} from "react";
import { List, Item } from "./styles";

const ListGrid = ({
  children,
  rowHeight = 10,
  colWidth = "300px",
  grap = 10
}) => {
  const [spans, setSpans] = useState([]);
  const ref = useRef();
  const calcSpan = useCallback(() => {
    const spans = [];
    Array.from(ref.current.children).map(child => {
      const childHeight = child.clientHeight;
      // console.log(childHeight)
      const span = Math.ceil(childHeight / (rowHeight + grap));
      // child.style.height = `${span * (rowHeight + grap) - grap}px`

      return spans.push(span);
    });
    setSpans(spans);
  }, [grap, rowHeight]);

  useEffect(() => {
    calcSpan();
    window.addEventListener("resize", calcSpan);
    return () => {
      window.removeEventListener("resize", calcSpan);
    };
  }, [calcSpan, children]);

  return (
    <List ref={ref} colWidth={colWidth} rowHeight={rowHeight} grap={grap}>
      {children.map((child, i) => (
        <Item key={i} span={spans[i]}>
          {child}
        </Item>
      ))}
    </List>
  );
};

export default ListGrid;
