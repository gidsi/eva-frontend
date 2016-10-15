import request from 'superagent';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';

const SPACEURL_CREATED = 'SPACEURL_CREATED';

export const fetched = createAction(SPACEURL_CREATED, (result) => result);

export const addSpaceUrl = (url) => (dispatch) => {
  request
    .post(`${config.api.url}/url`)
    .send({
      url,
    })
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
  addSpaceUrl,
};

export default handleActions({
  [SPACEURL_CREATED]: (state, { payload }) => (
    {
      spaceurl: payload,
    }
  ),
}, { spaceurl: [] });
