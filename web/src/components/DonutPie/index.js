import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Row, Col } from 'reactstrap';
import Slices from './Slices';
import Legend from './Legend';
import StudentData from '../StudentData';
import studentCategories from '../../assets/studentCategories';

class DonutPie extends Component {
  currentData = {};
  
  getCurrentData = () => {
    const { currentData } = this;
    return currentData;
  };
  
  setCurrentData = (data) => {
    this.currentData = data;
  };
  
  navigateTo = (pathname) => {
    const { history, match: { url, params: { category_id } } } = this.props;
    history.push({
      pathname: `${url.split(`/${category_id}`)[0]}/${pathname}`
    });
  };
  
  render() {
    const { match: { params: { category_id } } } = this.props;
    return (
      <Row>
        <Col md={category_id ? 6 : 12} style={{textAlign:'center'}}>
          <Row>
            <Col md={4} style={{marginTop:100, textAlign:'right'}} key="legend">
              <Legend items={studentCategories} />
            </Col>
            <Col md={8} key="donutPie">
              <svg
                className="donutPie"
                width="300"
                height="300">
                <Slices
                  data={studentCategories}
                  getCurrentData={this.getCurrentData}
                  setCurrentData={this.setCurrentData}
                  navigateTo={this.navigateTo}
                />
              </svg>
            </Col>
          </Row>
        </Col>
        {
          (category_id) &&
            <Col md={6}>
              <StudentData
                category_id={category_id}/>
            </Col>
        }
      </Row>
    )
  }
}

export default withRouter(DonutPie);