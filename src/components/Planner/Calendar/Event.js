import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  GET_EVENTS,
  SET_SELECTED_EVENT_TYPE,
  START_DRAG,
  STOP_DRAG,
  DELETE_EVENT,
  SET_EVENT
} from '../../../actions/types';

class Event extends Component {
  constructor(props) {
    super(props);
    this.type = '';
  }

  //   shouldComponentUpdate(nextProps, nextState) {
  //     if (nextState !== null && nextState.type !== this.type)
  //       console.log('updating event');
  //     return nextState !== null && nextState.type !== this.type;
  //     // return true;
  //   }

  handleSetType() {
    const { deleteEvent, setEvent } = this.props;
    const { selectedType } = this.props.dragDrop;
    if (selectedType === null) {
      return;
    }

    if (selectedType === '') {
      console.log('Is delete');
      deleteEvent({
        payload: {
          userid: this.props.userid,
          date: this.props.date
        }
      });
    } else {
      setEvent({
        payload: {
          userid: this.props.userid,
          date: this.props.date,
          type: selectedType
        }
      });
    }
    this.type = selectedType;
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

    startDrag({
      payload: {
        userid: this.props.userid,
        date: this.props.date
      }
    });

    this.handleSetType();
  };

  mouseEnterHandler = () => {
    const { dragEvent } = this.props.dragDrop;

    if (!dragEvent.active || dragEvent.userid !== this.props.userid) {
      return;
    }

    // this.type = this.props.events.selectedType;
    // this.setState({ type: this.props.events.selectedType });

    this.handleSetType();
  };

  getEvent() {
    this.type = '';
    this.props.events.forEach(user => {
      if (user.id === this.props.userid) {
        user.events.forEach(event => {
          if (event.date === this.props.date) {
            // console.log(`got event ${event.type}`);
            if (event.type === undefined) {
              console.log(`event type is undefiend for date ${event.date}`);
              return;
            }
            this.type = event.type;
            return;
          }
        });
      }
    });
  }

  render() {
    this.getEvent();
    return (
      <div
        className={'event ' + this.type.toLocaleLowerCase()}
        style={{ gridRowStart: this.props.row }}
        onMouseUp={this.mouseUpHandler.bind(this)}
        onMouseDown={this.mouseDownHandler.bind(this)}
        onMouseEnter={this.mouseEnterHandler.bind(this)}
      >
        {this.type}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  events: state.event.events,
  dragDrop: state.dragDrop
});

const mapDispatchToProps = dispatch => ({
  getEvents: () => dispatch({ type: GET_EVENTS }),
  setSelectedEventType: payload =>
    dispatch({ type: SET_SELECTED_EVENT_TYPE, ...payload }),
  startDrag: payload => dispatch({ type: START_DRAG, ...payload }),
  stopDrag: () => dispatch({ type: STOP_DRAG }),
  deleteEvent: payload => dispatch({ type: DELETE_EVENT, ...payload }),
  setEvent: payload => dispatch({ type: SET_EVENT, ...payload })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Event);

Event.propTypes = {
  events: PropTypes.array.isRequired,
  getEvents: PropTypes.func.isRequired
};
