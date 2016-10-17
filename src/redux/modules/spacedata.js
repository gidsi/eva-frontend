import { PropTypes } from 'react';
import request from 'superagent';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';

export const filterStruct = PropTypes.arrayOf(PropTypes.string);
export const spacedataElementStruct = PropTypes.shape({
  space: PropTypes.string.isRequired,
  location: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }),
});
export const itemsStruct = PropTypes.arrayOf(spacedataElementStruct);
export const spacedataStruct = PropTypes.shape({
  items: itemsStruct,
  filter: filterStruct,
});

const SPACEDATA_FETCHED = 'SPACEDATA_FETCHED';
const SPACEDATA_FILTER = 'SPACEDATA_FILTER';

export const fetched = createAction(SPACEDATA_FETCHED, result => result);
export const filter = createAction(SPACEDATA_FILTER, result => result);

export const fetchSpacedata = () => (dispatch) => {
  request
    .get(`${config.api.url}/spaces`)
    .set('Content-Type', 'application/json')
    .end(
      (err, res) => {
        if (!err) {
          dispatch(fetched(res.body));
        }
      }
    );
};

export const toggleFilterSpacedata = space => (dispatch) => {
  dispatch(
    filter(
      {
        space,
      }
    )
  );
};

export const actions = {
  fetchSpacedata,
  toggleFilterSpacedata,
};

export default handleActions({
  [SPACEDATA_FETCHED]: (state, { payload }) => (
    {
      ...state,
      items: payload,
    }
  ),
  [SPACEDATA_FILTER]: (state, { payload }) => {
    const newState = { ...state };

    if (newState.filter.indexOf(payload.space) === -1) {
      newState.filter.push(payload.space);
    } else {
      newState.filter.splice(newState.filter.indexOf(payload.space), 1);
    }

    return newState;
  },
}, { items: [], filter: [] });
