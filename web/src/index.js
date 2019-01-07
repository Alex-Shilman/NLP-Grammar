import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './redux/store';
import * as serviceWorker from './serviceWorker';
import GlobalStyle from './global-styles';

const store = configureStore({});
const root = document.getElementById('root');
const AppWrapper = ({store}) => (
  <BrowserRouter>
    <Fragment>
      <GlobalStyle />
      <main className="wrapper">
        <Provider store={store}>
          <App />
        </Provider>
      </main>
    </Fragment>
  </BrowserRouter>
);

ReactDOM.render(<AppWrapper store={store}/>, root);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
