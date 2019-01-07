import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectData } from '../../redux/selectors';
import Loader from '../Loader';
import { Table } from 'reactstrap';
import Row from './Row';

class StudentData extends Component {
  render() {
    const { category_id, data: { loading, data } } = this.props;
    const { studentData = []} = data || {};
    
    return (
      <section>
       <Table>
          <colgroup>
            <col width="10%" />
            <col width="65%"/>
            <col width="25%" />
          </colgroup>
          <thead>
          <tr>
            <th>#</th>
            <th>Students</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
            loading
              ? <tr><td colSpan={3}><Loader /></td></tr>
              : studentData.map((obj, idx) => (
              <Row
                key={idx}
                index={idx}
                student={obj}
                category_id={category_id}
              />
            ))
          }
          </tbody>
        </Table>
      </section>
    );
  }
}

const mapStateToProps = (globalState) => ({
  data: selectData(globalState),
});



export default connect(mapStateToProps, null)(StudentData);