import { GET_EVENTS, DELETE_EVENT, SET_EVENT } from '../actions/types';

const initalState = {
  events: [
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
    },
    {
      id: 3,
      user: 'Peter',
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
    },
    {
      id: 4,
      user: 'John',
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
    },
    {
      id: 5,
      user: 'Sepp',
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

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_EVENTS: {
      return { ...state };
    }
    case DELETE_EVENT: {
      const { userid, date } = action.payload;
      let users = state.events.map(user => {
        if (user.id === userid) {
          user.events = user.events.filter(event => event.date !== date);
        }
        return user;
      });
      return { ...state, state: { planner: { ...users } } };
    }
    case SET_EVENT: {
      const { userid, type, date } = action.payload;
      if (type === undefined || type === null) {
        return state;
      }

      let events = state.events.map(user => {
        if (user.id === userid) {
          let eventSet = false;

          let userEvents = user.events.map(event => {
            if (event.date === date) {
              eventSet = true;
              return {
                ...event,
                type: type
              };
            }
            return event;
          });

          if (!eventSet) {
            userEvents.push({ date: date, type: type });
          }
          user.events = userEvents;
        }
        return user;
      });

      return { ...state, events: events };
    }
    default:
      return state;
  }
}
