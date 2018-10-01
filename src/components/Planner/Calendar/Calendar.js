import React, { Component } from 'react';
// import PropTypes from "prop-types";
import moment from 'moment';
import 'moment/locale/de';
// import 'moment/min/moment-with-locales';

import { workdaysInMonth } from './DateHelper';
import Days from './Days';
import DOWs from './DOWs';
import Weeks from './Weeks';
import Events from './Events';

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

class Calendar extends Component {
  constructor(props) {
    super(props);

    if (this.props.locale) {
      moment.locale(this.props.locale);
    }
    this.startDate = moment(this.props.startDate);
    this.endDate = moment(this.props.endDate);

    this.months = this.generateMonths();
  }

  generateMonths() {
    let months = [];
    let date = moment(this.startDate);
    let prevMonth = null;

    while (date.isSameOrBefore(this.endDate)) {
      if (date.month() !== prevMonth) {
        months.push({
          name: date.format('MMMM'),
          days: workdaysInMonth(date.month(), date.year())
        });

        prevMonth = date.month();
      }

      date.add(1, 'd');
    }
    return months;
  }

  renderMonths() {
    return this.months.map((month, idx) => {
      return <Month key={idx} name={month.name} days={month.days} />;
    });
  }

  render() {
    return (
      <div className="calendar-table">
        {this.renderMonths()}
        <Weeks startDate={this.startDate} endDate={this.endDate} />
        <DOWs startDate={this.startDate} endDate={this.endDate} />
        <Days startDate={this.startDate} endDate={this.endDate} />
        <Events startDate={this.startDate} endDate={this.endDate} />
      </div>
    );
  }
}

export default Calendar;
