import React, { Component } from 'react';
import { connect } from 'react-redux';
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
      deleteEvent(this.props.userid, this.props.date);
    } else {
      setEvent(this.props.userid, this.props.date, selectedType);
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

    startDrag(this.props.userid, this.props.date);
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

export default connect(
  mapStateToProps,
  { deleteEvent, setEvent, setSelectedEventType, startDrag, stopDrag }
)(Event);

Event.propTypes = {
  events: PropTypes.array.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  setEvent: PropTypes.func.isRequired,
  setSelectedEventType: PropTypes.func.isRequired,
  startDrag: PropTypes.func.isRequired,
  stopDrag: PropTypes.func.isRequired
};
