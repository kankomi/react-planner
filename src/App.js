import React, { Component } from 'react';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Calendar year="2019" locale="de" />
      </div>
    );
  }
}

export default App;
