import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { PencilAlt } from 'styled-icons/fa-solid';


const Pencil = styled.div`
  color: ${({color}) => color };
  cursor: pointer;
`;

export default ({
  editOnClick,
  editting,
  title,
  style
}) => {
  const pencilColor = editting ? 'lightblue' : '#2283C6';
  
  return (
    <Pencil
      color={pencilColor}
      style={style}
      onClick={editOnClick}
    >
      <PencilAlt
        size={20}
        title={title} />
        {`  ${title}`}
    </Pencil>
  )};
