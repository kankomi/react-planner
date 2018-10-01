import React, { Component } from 'react';

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.emps = ['Max', 'Susan'];
  }

  render() {
    return (
      <div className="emps-table">
        <div className="emps-col">Susan</div>
        <div className="emps-col">Max</div>
        <div className="emps-col">Max</div>
        <div className="emps-col">Max</div>
      </div>
    );
  }
}
