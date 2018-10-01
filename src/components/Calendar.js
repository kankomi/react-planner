import React, { Component } from 'react';
// import PropTypes from "prop-types";
import './Calendar.css';
import moment from 'moment';
import 'moment/locale/de';
// import 'moment/src/locale/de';

import { workdaysInMonth } from './DateHelper';
import business from 'moment-business';

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
    return <div className="day">{this.props.value}</div>;
  }
}

class Calendar extends Component {
  constructor() {
    super();
    moment.locale('de');
    this.date = moment();
    this.date.date(1);
    this.date.month(0);
    this.date.year(2019);

    this.months = [];

    for (let i = 0; i < 12; i++) {
      let date = moment().year(this.date.year());
      date = date.locale('de');

      this.months.push({
        name: date.month(i).format('MMMM'),
        days: workdaysInMonth(i, this.date.year())
      });
    }

    // this.months = [
    //   { name: 'Januar', days: workdaysInMonth(0, this.date.get('year')) },
    //   { name: 'Februar', days: workdaysInMonth(1, this.date.get('year')) },
    //   { name: 'März', days: workdaysInMonth(2, this.date.get('year')) },
    //   { name: 'April', days: workdaysInMonth(3, this.date.get('year')) },
    //   { name: 'Mai', days: workdaysInMonth(4, this.date.get('year')) },
    //   { name: 'Juni', days: workdaysInMonth(5, this.date.get('year')) },
    //   { name: 'Juli', days: workdaysInMonth(6, this.date.get('year')) },
    //   { name: 'August', days: workdaysInMonth(7, this.date.get('year')) },
    //   { name: 'September', days: workdaysInMonth(8, this.date.get('year')) },
    //   { name: 'Oktober', days: workdaysInMonth(9, this.date.get('year')) },
    //   { name: 'November', days: workdaysInMonth(10, this.date.get('year')) },
    //   { name: 'Dezember', days: workdaysInMonth(11, this.date.get('year')) }
    // ];

    this.dows = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
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
        dow.push(<DOW key={idx++} value={this.dows[date.day() - 1]} />);
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
        days.push(<Day key={idx++} value={date.date()} />);
      }

      date.add(1, 'd');
    }
    return days;
  }

  render() {
    return (
      <div className="grid">
        {this.renderMonths()}
        {this.renderWeeks()}
        {this.renderDows()}
        {this.renderDays()}
      </div>
    );
  }
}

export default Calendar;
