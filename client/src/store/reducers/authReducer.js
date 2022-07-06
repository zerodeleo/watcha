/* eslint-disable default-param-last */
/* eslint-disable no-console */
import * as types from '../types';

const initState = {
  auth: {
    uid: null,
    username: '',
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
      console.error('signin error', action.err);
      return {
        ...state,
        authError: action.err,
      };
    case types.SIGNOUT_USER_SUCCESS:
      console.log('signout success');
      return {
        ...state,
        authError: null,
      };
    case types.SIGNOUT_USER_ERROR:
      console.error('signout error', action.err);
      return {
        ...state,
        authError: action.err,
      };
    case types.SIGNUP_USER_SUCCESS:
      console.log('signup success');
      return {
        ...state,
        auth: action.payload,
        authError: null,
      };
    case types.SIGNUP_USER_ERROR:
      console.error('signup error ', action.err);
      return {
        ...state,
        authError: action.err,
      };
    default:
      return state;
  }
};

export default authReducer;
