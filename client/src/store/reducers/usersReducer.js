/* eslint-disable default-param-last */
/* eslint-disable no-console */
import * as types from '../types';

const initState = {
  usersArr: [{uid: null, username: ''}],
  usersError: null,
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        usersArr: action.payload,
        usersError: null
      };
    case types.GET_USERS_ERROR:
      return {
        ...state,
        usersError: action.err,
      };
    default:
      return state;
  }
};

export default usersReducer;
