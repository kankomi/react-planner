import React, { Component } from 'react';
import moment from 'moment';

export default class Weeks extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.endDate !== this.props.endDate;
  }

  render() {
    let date = moment(this.props.startDate);
    let weeks = [];
    let lastWeek = 0;
    console.log('rendering weeks');
    while (date.isSameOrBefore(this.props.endDate)) {
      if (lastWeek !== date.week()) {
        weeks.push(
          <div className="week" key={lastWeek}>
            {date.week()}
          </div>
        );
        lastWeek = date.week();
      }

      date.add(1, 'd');
    }
    return weeks;
  }
}
