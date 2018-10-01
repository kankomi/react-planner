import React, { Component } from 'react';
import moment from 'moment';
import business from 'moment-business';

import { Consumer } from '../../../context';

class Event extends Component {
  constructor(props) {
    super(props);
    this.type = '';
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== null && nextState.type !== this.type;
  }

  handleSetType(state) {
    const { dispatch } = state;
    let type = state.selectedType;
    if (state.events.dragEvent.active) {
      type = state.events.dragEvent.type;
    }

    if (type === '') {
      dispatch({
        type: 'DELETE_EVENT',
        payload: {
          userid: this.props.userid,
          date: this.props.date
        }
      });
    } else {
      dispatch({
        type: 'SET_EVENT',
        payload: {
          userid: this.props.userid,
          date: this.props.date,
          type: type
        }
      });
    }
    this.type = type;
  }
  mouseUpHandler = state => {
    const { dispatch } = state;
    if (state.events.dragEvent.active) {
      dispatch({ type: 'STOP_DRAG' });
      return;
    }

    this.handleSetType(state);
  };

  mouseDownHandler = state => {
    let type = state.selectedType;
    const { dispatch } = state;

    dispatch({
      type: 'START_DRAG',
      payload: {
        userid: this.props.userid,
        date: this.props.date,
        type: type
      }
    });
    dispatch({
      type: 'SET_EVENT',
      payload: {
        userid: this.props.userid,
        date: this.props.date,
        type: type
      }
    });
  };

  mouseEnterHandler = state => {
    const { dragEvent } = state.events;

    if (!dragEvent.active || dragEvent.userid !== this.props.userid) {
      return;
    }

    this.type = dragEvent.type;
    this.setState({ type: dragEvent.type });

    this.handleSetType(state, dragEvent.type);
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
    return (
      <Consumer>
        {value => {
          this.getEvent(value);

          return (
            <div
              className={'event ' + this.type.toLowerCase()}
              style={{ gridRowStart: this.props.row }}
              onMouseUp={this.mouseUpHandler.bind(this, value)}
              onMouseDown={this.mouseDownHandler.bind(this, value)}
              onMouseEnter={this.mouseEnterHandler.bind(this, value)}
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
  constructor(props) {
    super(props);
    this.startedDragging = false;
  }
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
