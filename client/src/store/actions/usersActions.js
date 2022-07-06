import axios from 'axios';
import * as types from '../types';

export const getUsers = (watchas) => (dispatch) => {
  axios.get(`/api/users/${process.env.REACT_APP_WATCHA_API_KEY}/`, { params: {watchas} })
    .then(res => dispatch({ type: types.GET_USERS_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: types.GET_USERS_ERROR, err: err.response.data }))
};
