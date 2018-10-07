import React, { Component } from 'react';
import { connect } from 'react-redux';

class Employees extends Component {
  render() {
    const { events } = this.props;
    return (
      <div className="emps-table">
        {events.map(val => (
          <div key={val.id} className="emps-col">
            {val.user}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.event.events
});

export default connect(mapStateToProps)(Employees);
