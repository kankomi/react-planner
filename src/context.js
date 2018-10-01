import React, { Component } from 'react';

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EVENT':
      const { userid, type, date } = action.payload;
      state.planner.forEach(user => {
        if (user.id === userid) {
          console.log('setting type ' + type);
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
    //   return {
    //     ...state,
    //     planner: state.planner.map(user => {
    //       if (user.id === userid) {
    //         console.log('setting type ' + type);
    //         user.
    //         user.events = events;
    //       }
    //       return user;
    //     })
    //   };
    case 'GET_EVENT':
      console.log(action);
      state.planner.forEach(user => {
        if (user.id === action.payload.userid) {
          user.events.forEach(event => {
            if (event.date === action.payload.date) {
              return event.type;
            }
          });
        }
      });
      return '';
    default:
      return state;
  }
};
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
