import React, { Component } from 'react';
import moment from 'moment';
import business from 'moment-business';
import { connect } from 'react-redux';
// import { Consumer } from '../../../context';
import PropTypes from 'prop-types';
import Event from './Event';
import { getEvents } from '../../../actions/eventActions';

class Events extends Component {
  startedDragging = false;
  componentDidMount() {
    this.props.getEvents();
  }
  renderEvents() {
    let days = [];
    let idx = 0;
    let row = 5; // starting at row 5
    const { events } = this.props;

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
    return this.renderEvents();
  }
}

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(
  mapStateToProps,
  { getEvents }
)(Events);

Events.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired
};
