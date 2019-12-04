import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";

export const List = styled.div`
  margin: 50px
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${props => props.colWidth}, 1fr)
  );
  grid-auto-rows: ${props => props.rowHeight}px;
  grid-gap: ${props => props.grap}px;
`;

export const Item = styled.div`
  grid-row-end: span ${props => props.span};
  height: max-content;
`;

// grid-auto-rows: ${props => props.rowHeight}px;


// export const Item = ({ children, rowHeight, grap }) => {
//   const ref = useRef();
//   const [span, setSpan] = useState();
//   const [height, setHeight] = useState();
//   const [first, setFirst] = useState(true);
  

//   const calcSpan = useCallback(() => {
//     const node = ref.current;
//     const childHeight = node.clientHeight;
//     const span = Math.ceil(childHeight / (rowHeight + grap));
//     setSpan(span);
//     setHeight(`${span*(rowHeight + grap) - grap}px`)
//   }, [grap, rowHeight]);

//   useEffect(() => {
//     calcSpan();
//     setFirst(false)
//     window.addEventListener("resize", calcSpan);
//     return () => {
//       window.removeEventListener("resize", calcSpan);
//     };
//   }, [calcSpan, children]);
//   return (
//     <ItemStyle span={span} ref={ref} height={first ? 'max-content' : height}>
//       {children}
//     </ItemStyle>
//   );
// };
// import React, { useRef, useEffect, useCallback } from "react";

// export const Item = ({children, rowHeight, grap}) => {
//   const ref = useRef();

//   const calcSpan = useCallback(() => {
//     const node = ref.current
//     const childHeight = node.clientHeight;
//     const span = Math.ceil(childHeight / (rowHeight + grap));
//     node.style.gridRow = `span ${span}`;
//     node.style.height = 'max-content';
//   }, [grap, rowHeight]);

//   useEffect(() => {
//     console.log('item')
//     calcSpan();
//     window.addEventListener("resize", calcSpan);
//     return () => {
//       window.removeEventListener("resize", calcSpan);
//     };
//   }, [calcSpan]);

//   return (
//     <div ref={ref}>
//       {children}
//     </div>
//   )
// }
