/* eslint-disable default-param-last */
/* eslint-disable no-console */
import * as types from '../types';

const initState = {
  wid: null,
  tag: '',
  watchas: [],
  messages: [
    {username: 'ZeroDeleo', msg: "It's pretty quite here... write a message :)", uid: 'admin', createdAt: 'Break of dawn'},
  ],
  watchaError: null,
};

const watchaReducer = (state = initState, action) => {
  switch (action.type) {
    case types.RESET_WATCHA:
      return {
        ...initState
      };
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
    case types.UPDATE_CHAT_SUCCESS:
      return {
        ...state,
        watchaError: null,
      }
    case types.UPDATE_CHAT_ERROR:
      return {
        ...state,
        watchaError: action.err,
      }
    case types.GET_CHAT_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        messages: action.payload,
        watchaError: null,
      }
    case types.GET_CHAT_ERROR:
      return {
        ...state,
        watchaError: action.err,
      }
    default:
      return state;
  }
};

export default watchaReducer;
