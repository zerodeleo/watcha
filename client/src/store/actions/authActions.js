import * as types from '../types';

export const signIn = (credentials) => (dispatch) => {
  dispatch({ type: types.SIGNIN_USER_SUCCESS, payload: credentials });
};

export const signOut = () => (dispatch) => {
  dispatch({ type: types.SIGNOUT_USER_SUCCESS });
};

export const signUp = (newUser) => (dispatch) => {
  dispatch({ type: types.SIGNUP_USER_SUCCESS, payload: newUser });
};
