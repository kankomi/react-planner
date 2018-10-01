import React, { Component } from 'react';
import { Consumer } from '../../context';

export default class Employees extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.endDate !== this.props.endDate;
  // }
  render() {
    return (
      <Consumer>
        {value => {
          const { planner } = value;
          return (
            <div className="emps-table">
              {planner.map(val => (
                <div key={val.id} className="emps-col">
                  {val.user}
                </div>
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}
