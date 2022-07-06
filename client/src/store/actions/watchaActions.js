import axios from 'axios';
import * as types from '../types';

export const addWatcha = (watcha, uid) => (dispatch) => {
  axios.post(`/api/watchas/${process.env.REACT_APP_WATCHA_API_KEY}/`, { watcha, uid })
    .then(res => dispatch({ type: types.ADD_WATCHA_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: types.ADD_WATCHA_ERROR, err: err.response.data }))
};
