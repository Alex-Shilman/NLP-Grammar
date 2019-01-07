import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { Row, Col } from 'reactstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectStudentList } from '../../redux/selectors';

const Wrapper = styled.header`
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 40px;
`;

const SelectedStudent = styled.h2`
  padding:10px;
`;

const Header = ({
  show,
  match = {},
  title = '',
  teacher = 'Ms. Frizzle',
  grade = 'Grade 3',
  subject = 'ELA',
  students,
}) => {
  const { params: { user_id: id, category_id } } = match;
  const { name } = _.find(students, { id }) || {};
  const studentDetail = [category_id];
  name && studentDetail.push(name);
  
  if (!show) return null;
  
  return (
    <Wrapper>
      <Row style={{background: 'linear-gradient(90deg, rgba(34,133,202,1) 0%, rgba(27,96,140,1) 100%)', color: 'white', fontWeight: '600'}}>
        <Col
          md={6}>
          {
            studentDetail.length &&  <SelectedStudent>{studentDetail.join(' - ')}</SelectedStudent>
          }
        </Col>
        <Col
          md={6}>
          <h1 style={{textAlign:'right', padding:10}}>{`${teacher}-${grade} ${subject}`}</h1>
        </Col>
      </Row>
    </Wrapper>
  );
};

const mapStateToProps = (globalState) => ({
  students: selectStudentList(globalState)
});

export default connect(mapStateToProps, null)(Header);

