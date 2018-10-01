import React, { Component } from 'react';
import { Consumer } from '../../context';

export default class Button extends Component {
  onClickHandler = dispatch => {
    dispatch({ type: 'SET_TYPE', payload: this.props.value });
  };
  render() {
    return (
      <Consumer>
        {state => {
          return (
            <button
              type="button"
              onClick={this.onClickHandler.bind(this, state.dispatch)}
            >
              {this.props.children}
            </button>
          );
        }}
      </Consumer>
    );
  }
}
