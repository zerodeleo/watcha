import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const SignedIn = ({ auth }) => {
  if (!auth.uid) return <Navigate to="/signup" />;

  return( 
  <p>
    Hello {auth.username}!
  </p>);
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
  auth: state.auth,
}};

const mapDispatchToProps = (dispatch) => ({
  // signUpDispatch: (credentials) => dispatch(signUp(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);
