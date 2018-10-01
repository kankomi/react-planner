import React, { Component } from 'react';
import moment from 'moment';
import business from 'moment-business';

import { Consumer } from '../../../context';

class Event extends Component {
  constructor(props) {
    super(props);
    this.type = '';
    this.shouldUpdate = false;
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== null;
  }
  clickHandler = dispatch => {
    let type = 'G';
    if (this.type !== '') {
      type = '';
    }
    dispatch({
      type: 'SET_EVENT',
      payload: { userid: this.props.userid, date: this.props.date, type: type }
    });
    this.shouldUpdate = false;
    this.setState({ type: type });
  };

  getEvent(state) {
    state.planner.forEach(user => {
      if (user.id === this.props.userid) {
        user.events.forEach(event => {
          if (event.date === this.props.date) {
            // console.log(`got event ${event.type}`);
            this.type = event.type;
            return;
          }
        });
      }
    });
    return '';
  }

  render() {
    console.log('rendering event');
    return (
      <Consumer>
        {value => {
          this.getEvent(value);

          return (
            <div
              className={'event ' + this.type.toLowerCase()}
              style={{ gridRowStart: this.props.row }}
              onClick={this.clickHandler.bind(this, value.dispatch)}
            >
              {this.type}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default class Events extends Component {
  renderEvents(events) {
    let days = [];
    let idx = 0;
    let row = 5; // starting at row 5

    events.forEach(employee => {
      let date = moment(this.props.startDate);
      while (date.isSameOrBefore(this.props.endDate)) {
        if (business.isWeekDay(date)) {
          days.push(
            <Event
              key={idx++}
              userid={employee.id}
              date={date.format('DD.MM.YYYY')}
              row={row}
            />
          );
        }
        date.add(1, 'd');
      }
      row++;
    });
    return days;
  }

  render() {
    return (
      <Consumer>
        {value => {
          return this.renderEvents(value.planner);
        }}
      </Consumer>
    );
  }
}
