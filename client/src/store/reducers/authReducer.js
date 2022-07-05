/* eslint-disable default-param-last */
/* eslint-disable no-console */
import * as types from '../types';

const initState = {
  auth: {
    uid: null,
    email: '',
    pw: '',
  },
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SIGNIN_USER_SUCCESS:
      console.log('signin success');
      return {
        ...state,
        authError: null,
      };
    case types.SIGNIN_USER_ERROR:
      console.error('signin error', action.err.message);
      return {
        ...state,
        authError: action.err.message,
      };
    case types.SIGNOUT_USER_SUCCESS:
      console.log('signout success');
      return {
        ...state,
        authError: null,
      };
    case types.SIGNOUT_USER_ERROR:
      console.error('signout error', action.err.message);
      return {
        ...state,
        authError: action.err.message,
      };
    case types.SIGNUP_USER_SUCCESS:
      console.log('signup success');
      return {
        ...state,
        authError: null,
      };
    case types.SIGNUP_USER_ERROR:
      console.error('signup error ', action.err.message);
      return {
        ...state,
        authError: action.err.message,
      };
    default:
      return state;
  }
};

export default authReducer;
