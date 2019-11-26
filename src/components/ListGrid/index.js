import React, { useState, useRef, useEffect, useCallback } from "react";
import { List, Item } from "./styles";

const ListGrid = ({ children, rowHeight = 10, colWidth = "300px", grap = 10 }) => {
  const [spans, setSpans] = useState([]);
  const ref = useRef();
  const computeSpans = useCallback(() => {
    const spans = [];
    Array.from(ref.current.children).map(child => {
    const childHeight = child.clientHeight
      const span = Math.ceil(childHeight / (rowHeight+grap));
      return spans.push(span + 1);
    });
    setSpans(spans);
  }, [grap, rowHeight]);

  useEffect(() => {
    computeSpans();
    window.addEventListener("resize", computeSpans);
    return () => {
      window.removeEventListener("resize", computeSpans);
    };
  }, [computeSpans, children]);

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
