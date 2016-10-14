import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import spacedataReducer from './modules/spacedata';
import calendarsReducer from './modules/calendar';

export default combineReducers({
	spacedata: spacedataReducer,
	calendars: calendarsReducer,
	routing: routerReducer,
});
