import React, { Component } from 'react';
import moment from 'moment';
import business from 'moment-business';
import Holidays from 'date-holidays';
import classNames from 'classnames';

export default class Days extends Component {
  constructor(props) {
    super(props);
    this.holidays = new Holidays('DE', 'BY');
    this.holidays.setLanguages('de');
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.endDate !== this.props.endDate;
  }

  render() {
    let date = moment(this.props.startDate);
    let days = [];
    let idx = 0;
    while (date.isSameOrBefore(this.props.endDate)) {
      if (business.isWeekDay(date)) {
        let holiday = this.holidays.isHoliday(date.toDate());
        let isPublicHoliday = false;
        let dataToggle = null;
        let dataPlacement = 'bottom';
        let tooltipText = null;

        if (holiday && holiday.type === 'public') {
          isPublicHoliday = true;
          dataToggle = 'tooltip';
          tooltipText = holiday.name;
        }

        days.push(
          <div
            key={idx++}
            className={classNames('day', {
              holiday: isPublicHoliday
            })}
            data-toggle={dataToggle}
            data-placement={dataPlacement}
            title={tooltipText}
          >
            {date.date()}
          </div>
        );
      }

      date.add(1, 'd');
    }
    return days;
  }
}
