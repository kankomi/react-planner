import { SET_SELECTED_EVENT_TYPE, START_DRAG, STOP_DRAG } from './types';

export const setSelectedEventType = payload => {
  return { type: SET_SELECTED_EVENT_TYPE, ...payload };
};

export const startDrag = payload => {
  return { type: START_DRAG, ...payload };
};
export const stopDrag = () => {
  return { type: STOP_DRAG };
};
