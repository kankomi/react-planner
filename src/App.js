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
          <Planner />
          <ButtonMenu />
        </div>
      </Provider>
    );
  }
}

export default App;
