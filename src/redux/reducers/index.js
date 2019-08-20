import { combineReducers } from 'redux';
import DarkModeReducer from './DarkModeReducer';
import TempWordsReducer from './TempWordsReducer';
import TempHistoryReducer from './TempHistoryReducer';
import PhoneoticsStatusReducer from './PhoneoticsStatusReducer';
import TempSavedReducer from './TempSavedReducer';

export default combineReducers({
  isDarkMode: DarkModeReducer,
  tempWords: TempWordsReducer,
  history: TempHistoryReducer,
  phoneoticsStatus: PhoneoticsStatusReducer,
  saved: TempSavedReducer
});
