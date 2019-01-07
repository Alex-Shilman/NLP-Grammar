import styled from 'styled-components';

export const FlexRow = styled.div`
  padding: 5px;
  margin: 0;
  list-style: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

export const FlexColumn = styled.div`
  width: ${(props) => props.size / 12 * 100 - 22}vw;
  text-align: right;
`;