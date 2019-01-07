import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import Header from '../Header';
import { Container } from 'reactstrap';

const Page = ({
  withHeader = true,
  children,
  match,
}) => (
  <Wrapper>
    <Header
      show={withHeader}
      match={match}
    />
    <Container>{children}</Container>
  </Wrapper>
);

const Wrapper = styled.div`
`;

export default withRouter(Page);