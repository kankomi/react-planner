import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

class Employees extends Component {
  render() {
    console.log(this.props);
    const { users } = this.props;
    if (users) {
      return (
        <div className="emps-table">
          {users.map(user => (
            <div key={user.id} className="emps-col">
              {user.firstName} {user.lastName}
            </div>
          ))}
        </div>
      );
    } else {
      return <div className="emps-table" />;
    }
  }
}

Employees.propTypes = {
  firestore: PropTypes.object.isRequired,
  users: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'users' }]), // or { collection: 'users' }
  connect((state, props) => ({
    users: state.firestore.ordered.users
  }))
)(Employees);
