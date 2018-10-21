import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/layout/NavBar';

import './styles/css/App.css';

import PlannerPage from './components/pages/PlannerPage';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <NavBar />
            <Switch>
              <Route exact path="/" component={PlannerPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
