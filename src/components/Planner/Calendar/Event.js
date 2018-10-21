import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import PropTypes from 'prop-types';
import { setEvent, deleteEvent } from '../../../actions/eventActions';
import {
  setSelectedEventType,
  startDrag,
  stopDrag
} from '../../../actions/dragDropActions';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = { type: props.type, previousType: '', eventid: props.eventid };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type !== this.state.type) {
      this.setState({
        type: nextProps.type,
        previousType: nextProps.type,
        eventid: nextProps.eventid
      });
    }
  }

  sendEvent = () => {
    const { firestore } = this.props;
    console.log('sending event');
    const event = {
      type: this.state.type,
      user: firestore.doc(`users/${this.props.userid}`),
      date: this.props.date
    };

    if (this.state.eventid) {
      if (this.state.type === '') {
        firestore
          .delete({ collection: 'events', doc: this.state.eventid })
          .then(() => {
            this.setState({
              ...this.state,
              previousType: this.state.type,
              eventid: ''
            });
          })
          .catch(e => {
            this.setState({ type: this.state.previousType });
          });
      } else {
        firestore
          .update({ collection: 'events', doc: this.state.eventid }, event)
          .then(() => {
            this.setState({
              ...this.state,
              previousType: this.state.type
            });
          })
          .catch(e => {
            this.setState({ type: this.state.previousType });
          });
      }
    } else {
      firestore
        .add({ collection: 'events' }, event)
        .then(e => {
          this.setState({
            ...this.state,
            previousType: this.state.type,
            eventid: e.id
          });
        })
        .catch(e => {
          this.setState({ type: this.state.previousType });
        });
    }
  };

  handleSetType() {
    const { deleteEvent, setEvent } = this.props;
    const { selectedType } = this.props.dragDrop;
    if (selectedType === null) {
      return;
    }
    if (selectedType === this.state.type) {
      return;
    }

    if (selectedType === '') {
      console.log('Is delete');
      deleteEvent(this.props.userid, this.props.date);
    } else {
      setEvent(this.props.userid, this.props.date, selectedType);
    }

    this.setState(
      { type: selectedType, previousType: this.state.type },
      this.sendEvent
    );
  }

  mouseUpHandler = () => {
    if (this.props.dragDrop.dragEvent.active) {
      this.props.stopDrag();
      return;
    }

    this.handleSetType();
  };

  mouseDownHandler = () => {
    const { dragDrop, startDrag } = this.props;

    if (dragDrop.selectedType === null) {
      return;
    }

    startDrag(this.props.userid, this.props.date);
    // this.handleSetType();
  };

  mouseEnterHandler = () => {
    const { dragEvent } = this.props.dragDrop;

    if (!dragEvent.active || dragEvent.userid !== this.props.userid) {
      return;
    }

    // this.state.type = this.props.events.selectedType;
    // this.setState({ type: this.props.events.selectedType });

    this.handleSetType();
  };

  render() {
    return (
      <div
        className={'event ' + this.state.type.toLocaleLowerCase()}
        style={{ gridRowStart: this.props.row }}
        onMouseUp={this.mouseUpHandler.bind(this)}
        onMouseDown={this.mouseDownHandler.bind(this)}
        onMouseEnter={this.mouseEnterHandler.bind(this)}
      >
        {this.state.type}
      </div>
    );
  }
}

export default compose(
  firestoreConnect(),
  connect((state, props) => ({
    dragDrop: state.root.dragDrop,
    ...{ deleteEvent, setEvent, setSelectedEventType, startDrag, stopDrag }
  }))
)(Event);

Event.contextTypes = {
  store: PropTypes.object
};

Event.propTypes = {
  // events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  setEvent: PropTypes.func.isRequired,
  setSelectedEventType: PropTypes.func.isRequired,
  startDrag: PropTypes.func.isRequired,
  stopDrag: PropTypes.func.isRequired
};
