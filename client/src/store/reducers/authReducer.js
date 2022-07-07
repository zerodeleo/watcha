/* eslint-disable default-param-last */
/* eslint-disable no-console */
import * as types from '../types';

const initState = {
  uid: null,
  username: '',
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        uid: action.payload.uid,
        username: action.payload.username,
        authError: null,
      };
    case types.SIGNUP_USER_ERROR:
      return {
        ...state,
        authError: action.err,
      };
    default:
      return state;
  }
};

export default authReducer;
