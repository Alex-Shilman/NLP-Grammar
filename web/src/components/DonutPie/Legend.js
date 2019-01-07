import React from 'react';
import styled from 'styled-components';
import { PieChart } from 'styled-icons/boxicons-solid';

const PieSlice = styled(PieChart)`
  color: ${({color}) => color}
`;

export default ({
  items
}) => {
  return items.map(({color, id, label}) => (
    <div>
      <PieSlice
        color={color}
        size={20}
        text={label}
      />
      <span style={{marginLeft:5}}>{label}</span>
    </div>
  ));
}
