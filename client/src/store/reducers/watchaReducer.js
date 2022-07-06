/* eslint-disable default-param-last */
/* eslint-disable no-console */
import * as types from '../types';

const initState = {
  wid: null,
  tag: '',
  watchas: [],
  watchaError: null,
};

const watchaReducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_WATCHA_SUCCESS:
      return {
        ...state,
        wid: action.payload.wid,
        tag: action.payload.tag,
        watchas: action.payload.watchas,
        watchaError: null,
      };
    case types.ADD_WATCHA_ERROR:
      return {
        ...state,
        watchaError: action.err,
      };
    default:
      return state;
  }
};

export default watchaReducer;
