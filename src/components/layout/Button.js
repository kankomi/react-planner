import React, { Component } from 'react';
// import { Consumer } from '../../context';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SET_SELECTED_EVENT_TYPE } from '../../actions/types';

class Button extends Component {
  onClickHandler = _ => {
    this.props.setSelectedEventType({ payload: this.props.value });

    if (this.props.onClick) {
      this.props.onClick(this.props.name);
    }
  };

  setIcon() {
    if (this.props.icon) {
      return <i className={'pr-1 fa fa-' + this.props.icon}> </i>;
    }
    return '';
  }

  render() {
    return (
      <button
        className={classNames('btn', this.props.className, {
          active: this.props.active
        })}
        type="button"
        onClick={this.onClickHandler}
      >
        {this.setIcon()}
        {this.props.children}
      </button>
    );
  }
}

const mapStateToPropTypes = state => ({
  dragDrop: state.dragDrop
});

const mapDispatchToProps = dispatch => ({
  setSelectedEventType: payload =>
    dispatch({ type: SET_SELECTED_EVENT_TYPE, ...payload })
});

export default connect(
  mapStateToPropTypes,
  mapDispatchToProps
)(Button);

Button.propTypes = {
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string
};

Button.defaultProps = {
  active: false
};
