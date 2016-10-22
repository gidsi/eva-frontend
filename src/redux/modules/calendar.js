import { PropTypes } from 'react';
import request from 'superagent';
import flatten from 'lodash/flatten';
import moment from 'moment';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';

export const eventStruct = {
  start: PropTypes.string.isRequired,
  WholeDayEvent: PropTypes.bool.isRequired,
  Description: PropTypes.string.isRequired,
  Summary: PropTypes.string.isRequired,
  space: PropTypes.string.isRequired,
};

const CALENDARS_FETCHED = 'CALENDARS_FETCHED';

export const fetched = createAction(CALENDARS_FETCHED, result => result);

export const fetchCalendars = () => (dispatch) => {
  request
    .get(`${config.api.url}/calendar`)
    .set('Content-Type', 'application/json')
    .end(
      (err, res) => {
        if (!err) {
          dispatch(fetched(res.body));
        }
      }
    );
};

export const actions = {
  fetchCalendars,
};

export default handleActions({
  [CALENDARS_FETCHED]: (state, { payload }) => {
    const items = flatten(
      payload.map(
        calendar => (
          calendar.Events.map(event => (
            {
              ...event,
              space: calendar.Space,
              start: moment(event.start),
              end: moment(event.end),
            }
          ))
        )
      )
    )
    .filter(event => event.start.isAfter())
    .sort((a, b) => a.start - b.start);
    return { items };
  },
}, { items: [] });
