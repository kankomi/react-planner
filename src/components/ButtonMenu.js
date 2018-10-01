import React, { Component } from 'react';
import Button from './Button/Button';
export default class ButtonMenu extends Component {
  render() {
    return (
      <div className="button-menu">
        <Button value="U">Urlaub</Button>
        <Button value="G">Gleitzeit</Button>
        <Button value="">Löschen</Button>
      </div>
    );
  }
}
