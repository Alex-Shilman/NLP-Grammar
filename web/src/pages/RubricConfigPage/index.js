import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadData } from '../../redux/actions'
import { selectData } from '../../redux/selectors';
import RubricTable from '../../components/RubricTable';
import Page from '../../components/Page';

class RubricConfigPage extends Component {
    
    render() {
        return (
            <Page>
                <RubricTable />
            </Page>
        );
    }
  }
  
  const mapStateToProps = (globalState) => ({
    data: selectData(globalState),
  });
  
  const mapDispatchToProps = {
    loadData
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(RubricConfigPage)