import { SET_SELECTED_EVENT_TYPE, START_DRAG, STOP_DRAG } from './types';

export const setSelectedEventType = type => {
  return { type: SET_SELECTED_EVENT_TYPE, payload: type };
};

export const startDrag = (userid, date) => {
  return {
    type: START_DRAG,
    payload: {
      userid: userid,
      date: date
    }
  };
};
export const stopDrag = () => {
  return { type: STOP_DRAG };
};
