import React, { Component } from 'react';
import './App.css';

import Planner from './components/Planner/Planner';
import Provider from './context';
import ButtonMenu from './components/ButtonMenu';
class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Planner startDate="2018-01-01" endDate="2018-05-31" locale="de" />
          <Planner startDate="2017-12-01" endDate="2018-02-28" locale="en" />

          <ButtonMenu />
        </div>
      </Provider>
    );
  }
}

export default App;
