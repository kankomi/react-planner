import React, { Component } from 'react';
import Calendar from './Calendar';
import './Planner.css';
import Employees from './Employees';

export default class Planner extends Component {
  render() {
    return (
      <div className="planner">
        <Employees />
        <Calendar year={this.props.year} locale={this.props.locale} />
      </div>
    );
  }
}
