import React, { Component } from 'react';
import { Consumer } from '../../context';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class Button extends Component {
  onClickHandler = dispatch => {
    dispatch({ type: 'SET_TYPE', payload: this.props.value });

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
      <Consumer>
        {state => {
          return (
            <button
              className={classNames('btn', {
                'btn-primary': this.props.active,
                'btn-secondary': !this.props.active
              })}
              type="button"
              onClick={this.onClickHandler.bind(this, state.dispatch)}
            >
              {this.setIcon()}
              {this.props.children}
            </button>
          );
        }}
      </Consumer>
    );
  }
}

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
