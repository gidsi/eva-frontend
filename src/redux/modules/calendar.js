import request from 'superagent';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';
import flatten from 'lodash/flatten';
import moment from 'moment';

const CALENDARS_FETCHED = 'CALENDARS_FETCHED';

export const fetched = createAction(CALENDARS_FETCHED, (result) => result)

 export const fetchCalendars = () => {
     return (dispatch) => {
         request
             .get(config.api.url + '/calendar')
             .set('Content-Type', 'application/json')
             .end((err, res) => {
                 if (err) {
                    console.log('cant fetch calendars');
                 } else {
                    dispatch(fetched(res.body));
                 }
             })
     }
 }

 export const actions = {
     fetchCalendars,
 };

export default handleActions({
    [CALENDARS_FETCHED]: (state, { payload }) => {
        const items = flatten(payload.map(calendar => {
            return calendar.Events.map(event => {
                event.space = calendar.Space;
                event.start = moment(event.Start);
                event.end = moment(event.End);
                return event;
            });
        })).filter((event) => {
            return event.start.isAfter();
        }).sort((a, b) => {
            return a.start - b.start;
        });
        return { items };
    },
}, { items: [] });