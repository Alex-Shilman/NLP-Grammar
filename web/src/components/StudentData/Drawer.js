import React, { Component } from 'react';
import { Collapse, Card } from 'reactstrap';
import styled from 'styled-components';

const Drawer = styled.td`
  border:0!important;
  padding:0!important;
  cursor: pointer;
`;

export default ({
  colSpan,
  isOpen,
  children
}) => (
  <Drawer colSpan={colSpan}>
    <Collapse isOpen={isOpen}>
      <Card>{children}</Card>
    </Collapse>
  </Drawer>
);