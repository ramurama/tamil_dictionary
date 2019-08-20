import { ACTION_SET_DARKMODE } from '../actionTypes';

export default (state = false, action) => {
  switch (action.type) {
    case ACTION_SET_DARKMODE:
      return action.isDarkMode;
    default:
      return state;
  }
};
