import React, { Component } from 'react';
import moment from 'moment';
import business from 'moment-business';

export default class Days extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.endDate !== this.props.endDate;
  }

  render() {
    let date = moment(this.props.startDate);
    let days = [];
    let idx = 0;
    while (date.isSameOrBefore(this.props.endDate)) {
      if (business.isWeekDay(date)) {
        days.push(
          <div key={idx++} className="day">
            {date.date()}
          </div>
        );
      }

      date.add(1, 'd');
    }
    return days;
  }
}
