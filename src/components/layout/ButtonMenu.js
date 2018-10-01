import React, { Component } from 'react';
import Button from './Button';

export default class ButtonMenu extends Component {
  state = { UBtn: false, GBtn: true, DeleteBtn: false };

  setActive = name => {
    Object.keys(this.state).forEach(key => {
      if (name === key) {
        this.setState({ [key]: true });
      } else {
        this.setState({ [key]: false });
      }
    });
  };

  render() {
    return (
      <div className="button-menu mt-2">
        <Button
          value="U"
          name="UBtn"
          active={this.state.UBtn}
          onClick={this.setActive}
        >
          Urlaub
        </Button>
        <Button
          name="GBtn"
          value="G"
          active={this.state.GBtn}
          onClick={this.setActive}
        >
          Gleitzeit
        </Button>
        <Button
          name="DeleteBtn"
          value=""
          active={this.state.DeleteBtn}
          onClick={this.setActive}
          icon="trash"
        >
          Löschen
        </Button>
      </div>
    );
  }
}
