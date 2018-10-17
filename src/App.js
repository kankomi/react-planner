import React, { Component } from 'react';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/layout/NavBar';

import './styles/css/App.css';

import Planner from './components/Planner/Planner';
import ButtonMenu from './components/layout/ButtonMenu';
import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <NavBar />
          <div className="p-2">
            <Planner startDate="2018-01-01" endDate="2018-05-31" locale="de" />
            <ButtonMenu />
          </div>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
