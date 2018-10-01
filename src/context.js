import React, { Component } from 'react';

const Context = React.createContext();

export default class Provider extends Component {
  state = {
    planner: [
      {
        id: 1,
        user: 'Max',
        events: [
          {
            type: 'G',
            date: '01.01.2018'
          },
          {
            type: 'E',
            date: '02.01.2018'
          },
          {
            type: 'U',
            date: '03.01.2018'
          }
        ]
      },
      {
        id: 2,
        user: 'Susann',
        events: [
          {
            type: 'G',
            date: '01.02.2018'
          },
          {
            type: 'E',
            date: '02.02.2018'
          },
          {
            type: 'U',
            date: '05.02.2018'
          }
        ]
      }
    ]
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
