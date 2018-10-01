import React, { Component } from 'react';
import Calendar from './Calendar/Calendar';
import Employees from './Employees';

export default class Planner extends Component {
  render() {
    return (
      <div className="planner">
        <Employees />
        <Calendar
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          locale={this.props.locale}
        />
      </div>
    );
  }
}
