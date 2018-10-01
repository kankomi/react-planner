import React, { Component } from 'react';
// import PropTypes from "prop-types";
import moment from 'moment';
import 'moment/locale/de';
// import 'moment/min/moment-with-locales';

import { workdaysInMonth } from './DateHelper';
import business from 'moment-business';

class Event extends Component {
  constructor(props) {
    super(props);

    this.state = { event: props.event };
  }

  clickHandler = e => {
    if (this.state.event === ' ') {
      this.setState(state => ({
        event: 'G'
      }));
    }
  };
  render() {
    return (
      <div
        className={'event ' + this.state.event.toLowerCase()}
        style={{ gridRowStart: this.props.row }}
        onClick={this.clickHandler}
      >
        {this.state.event || ''}
      </div>
    );
  }
}

class Month extends Component {
  render() {
    const divStyle = { gridColumn: 'span ' + this.props.days };
    return (
      <div className="month" style={divStyle}>
        {this.props.name}
      </div>
    );
  }
}

class Week extends Component {
  render() {
    return <div className="week">{this.props.value}</div>;
  }
}

class DOW extends Component {
  render() {
    return <div className="dow">{this.props.value}</div>;
  }
}

class Day extends Component {
  render() {
    return <div className="day">{this.props.day}</div>;
  }
}

class Calendar extends Component {
  constructor(props) {
    super(props);

    if (this.props.locale) {
      moment.locale(this.props.locale);
    }

    this.date = moment();
    this.date.date(1);
    this.date.month(0);

    if (this.props.year) {
      this.date.year(parseInt(this.props.year, 10));
    }

    this.months = this.generateMonths();
  }

  generateMonths() {
    let months = [];
    for (let i = 0; i < 12; i++) {
      let date = moment().year(this.date.year());

      months.push({
        name: date.month(i).format('MMMM'),
        days: workdaysInMonth(i, this.date.year())
      });
    }
    return months;
  }

  renderMonths() {
    return this.months.map((month, idx) => {
      return <Month key={idx} name={month.name} days={month.days} />;
    });
  }

  renderWeeks() {
    let date = moment(this.date);
    let weeks = [];
    let lastWeek = 0;
    while (date.year() === this.date.year()) {
      if (lastWeek !== date.week()) {
        weeks.push(<Week key={lastWeek} value={date.week()} />);
        lastWeek = date.week();
      }

      date.add(1, 'd');
    }
    return weeks;
  }

  renderDows() {
    let date = moment(this.date);
    let dow = [];
    let idx = 0;
    while (date.year() === this.date.year()) {
      if (business.isWeekDay(date)) {
        dow.push(<DOW key={idx++} value={date.format('dd')} />);
      }

      date.add(1, 'd');
    }
    return dow;
  }

  renderDays() {
    let date = moment(this.date);
    let days = [];
    let idx = 0;

    while (date.year() === this.date.year()) {
      if (business.isWeekDay(date)) {
        days.push(<Day key={idx++} day={date.date()} />);
      }

      date.add(1, 'd');
    }
    return days;
  }

  /**
   * Mock function to get events.
   *
   * Should be server call here.
   */
  getEvents() {
    let employees = ['Max', 'Susann', 'Peter', 'Sam'];
    let events = [];
    let mockEvents = [' ', 'G', 'U', 'E'];

    employees.forEach(emp => {
      let date = moment(this.date);
      let row = [];
      while (date.year() === this.date.year()) {
        if (business.isWeekDay(date)) {
          row.push({
            date: date,
            event: mockEvents[Math.floor(Math.random() * 4)]
          });
        }

        date.add(1, 'd');
      }
      events.push(row);
    });
    return events;
  }

  renderEvents() {
    let days = [];
    let idx = 0;
    let events = this.getEvents();
    let row = 5; // starting at row 5

    events.forEach(employee => {
      employee.forEach(data => {
        days.push(<Event key={idx++} event={data.event} row={row} />);
      });
      row++;
    });
    return days;
  }

  render() {
    return (
      <div className="calendar-table">
        {this.renderMonths()}
        {this.renderWeeks()}
        {this.renderDows()}
        {this.renderDays()}
        {this.renderEvents()}
      </div>
    );
  }
}

export default Calendar;
