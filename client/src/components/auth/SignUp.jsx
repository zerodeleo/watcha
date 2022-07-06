import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Components
import Error from '../error/Error';
import Form from '../layout/Form';

// Actions
import { signUp } from '../../store/actions/authActions';

// Styles
import * as styles from '../../css/styles';

const SignUp = ({ signUpDispatch, authError, auth }) => {
  if (auth.uid) return <Navigate to="/watcha" />;

  const [credentials, setCredentials] = useState({
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(/ /.test(value)) return;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpDispatch(credentials);
  };

  return (
    <section className={`SignUp ${styles.SignUp}`}>
      < Form
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={credentials.username}
        name='username'
        txt='enter'
        label='Enter your name to get started :'
      />
    </section>
  );
}

const mapStateToProps = (state) => {
  return {
  authError: state.auth.authError,
  auth: state.auth,
}};

const mapDispatchToProps = (dispatch) => ({
  signUpDispatch: (credentials) => dispatch(signUp(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
