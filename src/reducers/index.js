import { combineReducers } from 'redux';
import eventReducer from './eventReducer';
import dragDropReducer from './dragDropReducer';

export default combineReducers({
  event: eventReducer,
  dragDrop: dragDropReducer
});
