import { ACTION_SET_TEMP_SAVED } from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_TEMP_SAVED:
      return action.saved;
    default:
      return state;
  }
};
