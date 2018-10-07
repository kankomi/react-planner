import { GET_EVENTS, DELETE_EVENT, SET_EVENT } from './types';

export const getEvents = () => {
  return {
    type: GET_EVENTS
  };
};
export const deleteEvent = payload => {
  return { type: DELETE_EVENT, ...payload };
};
export const setEvent = payload => {
  return { type: SET_EVENT, ...payload };
};
