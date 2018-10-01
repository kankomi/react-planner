import React, { Component } from 'react';
import moment from 'moment';
import business from 'moment-business';

export default class DOWs extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.endDate !== this.props.endDate;
  }

  render() {
    let date = moment(this.props.startDate);
    let days = [];
    let idx = 0;
    console.log('rendering dows');
    while (date.isSameOrBefore(this.props.endDate)) {
      if (business.isWeekDay(date)) {
        days.push(
          <div key={idx++} className="dow">
            {date.format('dd')}
          </div>
        );
      }

      date.add(1, 'd');
    }
    return days;
  }
}
