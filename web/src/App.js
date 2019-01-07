import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Landingpage from './pages/Landingpage';
import NlpOverview from './pages/NlpOverview';
import StudentLevel3 from './pages/StudentLevel3';
import RubricConfigPage from './pages/RubricConfigPage';

import 'bootstrap/dist/css/bootstrap.css'

export default () => (
  <Wrapper>
    <TransitionGroup className="transition-group">
      <CSSTransition
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade">
        <section className="route-section">
          <Switch>
            <Route exact path="/" component={Landingpage} />
            <Route path="/dashboard/:category_id?" component={NlpOverview}/>
            <Route path="/level3/:category_id/:user_id" component={StudentLevel3}/>
            <Route path="/rubric-config" component={RubricConfigPage}/>
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  </Wrapper>
);

const Wrapper = styled.div`
  .fade-enter {
    opacity: 0.01;
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 300ms ease-in;
  }

  .fade-exit {
    opacity: 1;
  }

  .fade-exit.fade-exit-active {
    opacity: 0.01;
    transition: opacity 300ms ease-in;
  }

  div.transition-group {
    position: relative;
  }

  section.route-section {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
  }
`;