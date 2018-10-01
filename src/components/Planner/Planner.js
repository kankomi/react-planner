import React, { Component } from 'react';
import Calendar from './Calendar/Calendar';
import './css/Planner.css';
import Employees from './Employees';

export default class Planner extends Component {
  render() {
    return (
      <div className="planner">
        <Employees />
        <Calendar
          startDate="2018-01-01"
          endDate="2018-05-31"
          locale={this.props.locale}
        />
      </div>
    );
  }
}
