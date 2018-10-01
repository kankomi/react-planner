import React, { Component } from 'react';

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TYPE': {
      return { ...state, selectedType: action.payload };
    }
    case 'START_DRAG': {
      const { dragEvent } = state.events;
      dragEvent.active = true;
      dragEvent.userid = action.payload.userid;
      dragEvent.startDate = action.payload.date;
      dragEvent.type = action.payload.type;

      return { ...state, dragEvent };
    }
    case 'STOP_DRAG': {
      const { dragEvent } = state.events;
      dragEvent.active = false;
      dragEvent.userid = null;
      return state;
    }
    case 'DELETE_EVENT': {
      const { userid, date } = action.payload;
      state.planner.forEach(user => {
        if (user.id === userid) {
          user.events = user.events.filter(event => event.date !== date);
        }
      });
      return state;
    }
    case 'SET_EVENT': {
      const { userid, type, date } = action.payload;
      state.planner.forEach(user => {
        if (user.id === userid) {
          let eventSet = false;

          user.events.forEach(event => {
            if (event.date === date) {
              event.type = type;
              eventSet = true;
            }
          });

          if (!eventSet) {
            user.events.push({ date: date, type: type });
          }
        }
      });
      return state;
    }
    default:
      return state;
  }
};
export default class Provider extends Component {
  state = {
    events: {
      dragEvent: {
        active: false,
        userid: null,
        type: ''
      }
    },
    selectedType: 'G',
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
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
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
