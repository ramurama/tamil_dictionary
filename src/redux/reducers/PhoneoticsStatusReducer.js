import { ACTION_SET_PHONEOTICS_STATUS } from '../actionTypes';

export default (state = true, action) => {
  switch (action.type) {
    case ACTION_SET_PHONEOTICS_STATUS:
      return action.phoneoticsStatus;
    default:
      return state;
  }
};
