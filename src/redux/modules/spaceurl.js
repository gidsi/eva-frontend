import { PropTypes } from 'react';
import request from 'superagent';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';

export const itemStruct = PropTypes.shape({
  url: PropTypes.string.isRequired,
  validated: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired,
});
export const spaceUrlStruct = PropTypes.shape({
  items: PropTypes.arrayOf(itemStruct),
});

const SPACEURL_FETCHED = 'SPACEURL_FETCHED';
const SPACEURL_VALIDATE = 'SPACEURL_VALIDATE';

export const fetched = createAction(SPACEURL_FETCHED, result => result);
export const validate = createAction(SPACEURL_VALIDATE, result => result);

export const fetchSpaceUrl = () => (dispatch) => {
  request
    .get(`${config.api.url}/urls`)
    .set('Content-Type', 'application/json')
    .end(
      (err, res) => {
        if (!err) {
          dispatch(fetched(res.body));
        }
      }
    );
};

export const validateSpaceUrl = (spaceUrl, secret) => (dispatch) => {
  request
    .put(`${config.api.url}/urls/${secret}`)
    .send(spaceUrl)
    .set('Content-Type', 'application/json')
    .end(
      (err) => {
        if (!err) {
          dispatch(validate(spaceUrl));
        }
      }
    );
};

export const actions = {
  fetchSpaceUrl,
  validateSpaceUrl,
};

export default handleActions({
  [SPACEURL_FETCHED]: (state, { payload }) => ({
    ...state,
    items: payload,
  }),
  [SPACEURL_VALIDATE]: (state, { payload }) => {
    const newState = {
      ...state,
    };

    newState.items.forEach(spaceUrl => ({
      ...spaceUrl,
      validated: spaceUrl.url === payload.url ? true : spaceUrl.validated,
    }));

    return newState;
  },
}, { items: [] });
