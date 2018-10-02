import React, { Component } from 'react';
import Button from './Button';

export default class ButtonMenu extends Component {
  state = { UBtn: false, GBtn: true, EBtn: false, DeleteBtn: false };

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
          className="btn-u"
          value="U"
          name="UBtn"
          active={this.state.UBtn}
          onClick={this.setActive}
        >
          <b>U</b>
          rlaub
        </Button>
        <Button
          className="btn-g"
          name="GBtn"
          value="G"
          active={this.state.GBtn}
          onClick={this.setActive}
        >
          <b>G</b>
          leitzeit
        </Button>
        <Button
          className="btn-e"
          name="EBtn"
          value="E"
          active={this.state.EBtn}
          onClick={this.setActive}
        >
          Bereitschaft
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
