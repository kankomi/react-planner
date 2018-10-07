import {
  SET_SELECTED_EVENT_TYPE,
  START_DRAG,
  STOP_DRAG
} from '../actions/types';

const initalState = {
  selectedType: null,
  dragEvent: {
    active: false,
    userid: null,
    startDate: null
  }
};

export default function(state = initalState, action) {
  switch (action.type) {
    case SET_SELECTED_EVENT_TYPE: {
      return { ...state, selectedType: action.payload };
    }
    case START_DRAG: {
      return {
        ...state,
        dragEvent: {
          ...state.dragEvent,
          active: true,
          userid: action.payload.userid,
          startDate: action.payload.date
        }
      };
    }
    case STOP_DRAG: {
      return {
        ...state,
        dragEvent: { ...state.dragEvent, active: false, userid: null }
      };
    }
    default:
      return state;
  }
}
