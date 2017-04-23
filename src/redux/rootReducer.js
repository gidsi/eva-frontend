import { combineReducers } from 'redux';
import spacedataReducer from './modules/spacedata';
import calendarsReducer from './modules/calendar';
import spaceUrlsReducer from './modules/spaceurl';

export default combineReducers({
  spacedata: spacedataReducer,
  calendars: calendarsReducer,
  spaceurls: spaceUrlsReducer,
});
