import { ACTION_SET_TEM_HISTORY } from '../actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case ACTION_SET_TEM_HISTORY:
      return action.history;
    default:
      return state;
  }
};
