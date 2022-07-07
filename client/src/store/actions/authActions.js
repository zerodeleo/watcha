import axios from 'axios';
import * as types from '../types';

export const signUp = (newUser) => (dispatch) => {
  const username = newUser.username;
  axios.post(`/api/users/${process.env.REACT_APP_WATCHA_API_KEY}/`, { username })
    .then(res => {
      console.log(res);
      localStorage.setItem('uid', JSON.stringify(res.data.uid));
      return res;
    })
    .then(res => dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: types.SIGNUP_USER_ERROR, err: err.response.data }))
};

export const logIn = () => (dispatch) => {
  const uid = JSON.parse(localStorage.getItem('uid'));
  axios.get(`/api/users/${process.env.REACT_APP_WATCHA_API_KEY}/${uid}`)
  .then(res => dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: res.data }))
  .catch(err => dispatch({ type: types.SIGNUP_USER_ERROR, err: err.response.data }))
};
