import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import { loadData } from '../../redux/actions';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectData } from '../../redux/selectors';
import { withRouter } from 'react-router';
import HighlightText from '../../components/StudentData/HighlightText';
import { standardRules, optionalRules } from '../../rules';
import RuleExample from '../../components/RuleExample';
import EditButtonset from '../..//components/EditButtonset';
import Loader from '../../components/Loader';

const ErrorRuleWrapper = styled.div`
  cursor:pointer;
  font-weight: ${({selected}) => selected ? 'bold' : 'normal'};
  &:hover {
    color: #007bffb3;
  }
`;

const sectionStyle = {
  border: '1px solid lightgray',
  marginBottom: '12px',
  padding: '10px 12px'
};

const allRules = Object.assign({}, standardRules, optionalRules);

const ErrorRule = ({
  rule_id,
  id,
  onClickHandler,
  selected,
}) => ( 
  <ErrorRuleWrapper
    onClick={() => onClickHandler(rule_id, id)}
    selected={selected}>
        {_.get(allRules[rule_id], 'name')}
    </ErrorRuleWrapper>
);

class StudentLevel3 extends Component {
  constructor(props) {
    super(props);
    this.textArea = React.createRef();
    const { match: { params: { user_id, category_id} } } = this.props;
    this.user_id = user_id;
    this.category_id = category_id;
    this.state = {
      rule_id: '',
      rule_uid: null,
      editable: false,
      newText: '',
    };
  }
  
  componentWillMount() {
    const { loadData } = this.props;
    loadData(this.user_id)
  }
  
  componentWillReceiveProps(nextProps) {
    const { data: { loading: loadingNext, data: dataNext }} = nextProps;
    const { data: { loading }} = this.props;
    if (loading && loadingNext !== loading) {
      const { analisysResults } = dataNext;
      const { rule_id, rule_uid: id } = this.state;
      if (analisysResults.length && !_.some(analisysResults, { rule_id, id })) {
        const { rule_id, id } = analisysResults[0];
        this.onChangeRule(rule_id, id);
      }
      
    }
  };
  
  onChangeRule = (rule_id, rule_uid) => {
    this.setState({
      rule_id,
      rule_uid,
      editable: false,
      newText: '',
    });
  };
  
  onToggleEditMode = () => {
    this.setState(({editable}) => ({
      editable: !editable,
    }), () => {
      const { editable } = this.state;
      !editable
        ? this.onSubmit()
        : this.textArea.current.focus();
    })
  };
  
  onSubmit = () => {
    const { newText } = this.state;
    const { loadData } = this.props;
    newText && loadData(this.user_id, newText)
      .then(() => this.setState({newText: ''}));
  };
  
  onPassageChange = (e) => {
    const { value } = e.target;
    this.setState({
      newText: value
    });
  };
  
  render() {
    const { rule_id, rule_uid, editable, newText } = this.state;
    const { data: { loading, data }  } = this.props || {};
    const { studentData = [], analisysResults = [] }  = data || {};
    const { positions,
            word, correction, candidates    // these are specific to the spell check rule
          } = _.find(analisysResults, {rule_id, id: rule_uid}) || {};
    const myData = _.find(studentData, { id: this.user_id});
    const text = _.get(myData, 'text', '');
    const studentWritingSectionStyle = Object.assign({}, sectionStyle, {minHeight: '300px'});
    const rule = allRules[rule_id] || {};
    const spellingCorrections = _.merge([correction], candidates).join(', ') || 'No Spelling Suggestions were Detected';
    const dashboardUrl = `/dashboard/${this.category_id}`;
    
    return (
      <Row>
        <Col md={12}>
          <Link to={dashboardUrl}>Back to dashboard</Link>
          <br/>
        </Col>
        <Col md={4} style={{position: 'relative'}}>
          <h4>Student's Writing</h4>
          <EditButtonset
            title={(editable) ? ((newText) ? 'save' : 'cancel') : 'edit'}
            editting={editable}
            style={{position:'absolute', right:15, top:0}}
            editOnClick={this.onToggleEditMode}
          />
         <section style={studentWritingSectionStyle}>
          { (loading)
            ? <Loader />
            : (editable)
              ? <textarea
                value={newText || text}
                ref={this.textArea}
                onChange={this.onPassageChange}
                style={{border:'0', width:'100%'}} />
              : <HighlightText
                text={text}
                positions={positions} />
          }
        </section>
        </Col>
        <Col md={8}>
          <h4>Triggered Rules</h4>
          <section style={sectionStyle}>
            {
              loading
                ? <Loader />
                : analisysResults.length ? analisysResults.map(({rule_id, id}) => (
                  <ErrorRule
                    key={id}
                    id={id}
                    rule_id={rule_id}
                    selected={this.state.rule_id === rule_id && this.state.rule_uid === id}
                    onClickHandler={this.onChangeRule}
                  />
                )) : 'none'
            }
          </section>
          <h4>Rule Details</h4>
          <section>
            {
              (rule.description || rule.example)
                ? <React.Fragment>
                  <p dangerouslySetInnerHTML={{__html: rule.description}}></p>
                  <RuleExample
                    html={rule.example}
                  />
                  </React.Fragment>
                : 'none'
            }
            {
              (rule_id === 'spellCorrect' && analisysResults.length) && (
                <section>
                  <h5>Spelling Suggestions</h5>
                  <p>{spellingCorrections}</p>
                </section>
            )
            }
          </section>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (globalState) => ({
  data: selectData(globalState),
});

const mapDispatchToProps = {
  loadData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StudentLevel3));