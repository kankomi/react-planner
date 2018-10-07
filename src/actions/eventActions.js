import { GET_EVENTS, DELETE_EVENT, SET_EVENT } from './types';

export const getEvents = () => {
  return {
    type: GET_EVENTS
  };
};
export const deleteEvent = (userid, date) => {
  return { type: DELETE_EVENT, payload: { userid: userid, date: date } };
};
export const setEvent = (userid, date, type) => {
  return {
    type: SET_EVENT,
    payload: { userid: userid, type: type, date: date }
  };
};
