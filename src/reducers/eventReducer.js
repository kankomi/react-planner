import { GET_EVENTS, DELETE_EVENT, SET_EVENT } from '../actions/types';

const initalState = {
  events: []
};

export default function(state = initalState, action) {
  switch (action.type) {
    case GET_EVENTS: {
      return { ...state, events: action.payload };
    }
    case DELETE_EVENT: {
      const { userid, date } = action.payload;
      let events = state.events.map(user => {
        if (user.id === userid) {
          user.events = user.events.filter(event => event.date !== date);
        }
        return user;
      });
      return { ...state, events: events };
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
