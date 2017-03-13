import { PropTypes } from 'react';
import request from 'superagent';
import flatten from 'lodash/flatten';
import moment from 'moment';
import RRule from 'rrule';
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
    const items = flatten(flatten(
      payload.map(
        calendar => (
          calendar.Events.map((event) => {
            if (event.rrule) {
              try {
                  const options = RRule.parseString(event.rrule);
                  options.dtstart = moment(event.start).toDate();
                  const rule = new RRule(options);

                  return rule.between(
                      moment().toDate(),
                      moment().add(3, 'months').toDate()
                  ).map(date => (
                      {
                          ...event,
                          space: calendar.Space,
                          start: moment(date),
                          end: null,
                      }
                  ));
              }
              catch (ex) {
                console.log(ex);
                return [];
              }
            }

            return [
              {
                ...event,
                space: calendar.Space,
                start: moment(event.start),
                end: moment(event.end),
              },
            ];
          })
        )
      )
    ))
    .filter(event => event.start.isAfter())
    .sort((a, b) => a.start - b.start);
    return { items };
  },
}, { items: [] });
