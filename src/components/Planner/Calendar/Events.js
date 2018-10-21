import React, { Component } from 'react';
import moment from 'moment';
import business from 'moment-business';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

// import { Consumer } from '../../../context';
import PropTypes from 'prop-types';
import Event from './Event';
// import { getEvents } from '../../../actions/eventActions';

class Events extends Component {
  startedDragging = false;

  getEventForUser = (userid, date) => {
    const { events } = this.props;

    if (!events) {
      return null;
    }

    let retEvent = null;
    events.forEach(event => {
      if (userid === event.user.id && date.isSame(event.date.toDate())) {
        retEvent = event;
        return;
      }
    });

    return retEvent;
  };

  render() {
    let days = [];
    let idx = 0;
    let row = 5; // starting at row 5
    const { users } = this.props;

    if (!users) {
      return days;
    }

    users.forEach(user => {
      let date = moment(this.props.startDate);
      while (date.isSameOrBefore(this.props.endDate)) {
        if (business.isWeekDay(date)) {
          const event = this.getEventForUser(user.id, date);

          days.push(
            <Event
              key={idx++}
              userid={user.id}
              date={date.toDate()}
              row={row}
              type={event ? event.type : ''}
              eventid={event ? event.id : ''}
            />
          );
        }
        date.add(1, 'd');
      }
      row++;
    });

    return days;
  }
}

Events.propTypes = {
  firestore: PropTypes.object.isRequired,
  events: PropTypes.array
};

export default compose(
  firestoreConnect(['events', 'users']),
  connect((state, props) => ({
    events: state.firestore.ordered.events,
    users: state.firestore.ordered.users
  }))
)(Events);
