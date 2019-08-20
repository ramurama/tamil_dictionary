import {
  ACTION_SET_DARKMODE,
  ACTION_SET_TEMP_WORDS,
  ACTION_SET_TEM_HISTORY,
  ACTION_SET_PHONEOTICS_STATUS,
  ACTION_SET_TEMP_SAVED
} from '../actionTypes';

export const setDarkMode = isDarkMode => ({
  type: ACTION_SET_DARKMODE,
  isDarkMode
});

export const setTempWords = tempWords => ({
  type: ACTION_SET_TEMP_WORDS,
  tempWords
});

export const setTempHistory = history => ({
  type: ACTION_SET_TEM_HISTORY,
  history
});

export const setPhoneoticsStatus = phoneoticsStatus => ({
  type: ACTION_SET_PHONEOTICS_STATUS,
  phoneoticsStatus
});

export const setSaved = saved => ({
  type: ACTION_SET_TEMP_SAVED,
  saved
});
