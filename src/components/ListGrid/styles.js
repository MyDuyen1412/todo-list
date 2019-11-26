import styled from 'styled-components'

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${props => props.colWidth}, 1fr)
  );
  grid-auto-rows: ${props => props.rowHeight}px;
  grid-gap: ${props => props.grap}px;
`

export const Item = styled.div`
  grid-row: span ${props => props.span};
  height: max-content;
`