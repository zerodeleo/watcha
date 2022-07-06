import axios from 'axios';
import * as types from '../types';

export const signIn = (credentials) => (dispatch) => {
  dispatch({ type: types.SIGNIN_USER_SUCCESS, payload: credentials });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: types.SIGNOUT_USER_SUCCESS });
};

export const signUp = (newUser) => (dispatch) => {
  const username = newUser.username;
  axios.post(`/api/${process.env.REACT_APP_WATCHA_API_KEY}/`, { username })
    .then(res => {
      localStorage.setItem('users', JSON.stringify(res.data))
      return res;
    })
    .then(res => dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: types.SIGNUP_USER_ERROR, err: err.response.data }))
};
