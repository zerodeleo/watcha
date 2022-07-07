import axios from 'axios';
import * as types from '../types';

export const getChat = (tag) => (dispatch) => {
  axios.get(`/api/watchas/${process.env.REACT_APP_WATCHA_API_KEY}/messages`, { params: {tag} })
    .then(res => dispatch({ type: types.GET_CHAT_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: types.GET_CHAT_ERROR, err: err.response.data }))
};

export const updateChat = ({watcha, auth, msg}) => (dispatch) => {
  axios.post(`/api/watchas/${process.env.REACT_APP_WATCHA_API_KEY}/${watcha.tag}`, { watcha, auth, msg })
    .then(res => dispatch({ type: types.UPDATE_CHAT_SUCCESS, payload: res.data }))
    .catch(err => dispatch({ type: types.UPDATE_CHAT_ERROR, err: err.response.data }))
};
