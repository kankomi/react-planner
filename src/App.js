import React, { Component } from 'react';
import './App.css';
import Planner from './components/Planner/Planner';
import Provider from './context';

class App extends Component {
  render() {
    return (
      <Provider>
        <div className="App">
          <Planner />
        </div>
      </Provider>
    );
  }
}

export default App;
