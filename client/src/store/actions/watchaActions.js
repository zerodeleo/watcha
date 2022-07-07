import axios from 'axios';
import * as types from '../types';
import io from 'socket.io-client';

export const addWatcha = (watcha, uid) => (dispatch) => {
  axios.post(`/api/watchas/${process.env.REACT_APP_WATCHA_API_KEY}/`, { watcha, uid })
    .then(res => {
      const socket = io.connect('http://localhost:4000');
      socket.emit('new_watcha', watcha);
      return res;
    })
    .then(res => dispatch({ type: types.ADD_WATCHA_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: types.ADD_WATCHA_ERROR, err: err.response.data }))
};

export const resetWatcha = () => (dispatch) => {
  dispatch({ type: types.RESET_WATCHA })
};
