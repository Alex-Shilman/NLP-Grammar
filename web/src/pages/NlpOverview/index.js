import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadData } from '../../redux/actions';
import { selectData } from '../../redux/selectors';
import DonutPie from '../../components/DonutPie';
import Page from '../../components/Page';

class NlpOverview extends Component {
  componentWillMount() {
    const { loadData } = this.props;
    const id = "student2";
    loadData(id);
  }
  
  render() {
    const { data: { data = [], loading } } = this.props;
    
    return (
      <Page>
        <DonutPie data={data} loading={loading}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(NlpOverview)

