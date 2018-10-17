import { GET_EVENTS, DELETE_EVENT, SET_EVENT } from './types';
import axios from 'axios';

export const getEvents = () => async dispatch => {
  const res = await axios.get('/testdata.json');
  dispatch({
    type: GET_EVENTS,
    payload: res.data.events
  });
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
