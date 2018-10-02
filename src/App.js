import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/css/App.css';

import Planner from './components/Planner/Planner';
import Provider from './context';
import ButtonMenu from './components/layout/ButtonMenu';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App container mt-2">
          <Planner startDate="2018-01-01" endDate="2018-05-31" locale="de" />
          <Planner startDate="2018-01-01" endDate="2018-01-31" locale="en" />

          <ButtonMenu />
        </div>
      </Provider>
    );
  }
}

export default App;
