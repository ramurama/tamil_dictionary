import { ACTION_SET_TEMP_WORDS } from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_TEMP_WORDS:
      return action.tempWords;
    default:
      return state;
  }
};
