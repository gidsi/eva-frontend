import request from 'superagent';
import { createAction, handleActions } from 'redux-actions';
import config from '../../api/config';

const SPACEURL_CREATED = 'SPACEURL_CREATED';

export const fetched = createAction(SPACEURL_CREATED, (result) => result)

 export const addSpaceUrl = (url) => {
     return (dispatch) => {
         request
             .post(config.api.url + '/url')
             .send({
                 url
             })
             .set('Content-Type', 'application/json')
             .end((err, res) => {
                 if (err) {
                    console.log('cant create spaceurl');
                 } else {
                    dispatch(fetched(res.body));
                 }
             })
     }
 }

 export const actions = {
     addSpaceUrl,
 }

export default handleActions({
    [SPACEURL_CREATED]: (state, { payload }) => {
        return { spaceurl: payload };
    },
}, { spaceurl: [] });