import React, { Component } from 'react';
import styled from 'styled-components';

const Prompt = styled.div`
    margin-bottom: 6px;
    font-size: 0.9em;
    color: gray;
`;

class RuleExample extends Component {
  render() {
    const { html } = this.props;
    if (!html) return (null);
    return (
      <section>
        <h5>Example</h5>
        <Prompt>The following shows illustrates how this rule would be triggered.</Prompt>
        <p style={{border: '1px solid #83a1d0', backgroundColor: '#ecf0f5', fontSize: '15px', padding: '6px'}} dangerouslySetInnerHTML={{__html: html}}/>
      </section>
    );
  }
}

export default RuleExample;