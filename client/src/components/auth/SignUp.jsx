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
  const [error, setError] = useState({isError: false, msg: ''});

  const [credentials, setCredentials] = useState({
    username: '',
  });

  const handleChange = (e) => {
    setError(false);
    const { name, value } = e.target;
    if(/ /.test(value)) return;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(/watcha/i.test(credentials.username)) {
        setError({isError: !error, msg: 'No way, WATCHA is for admin only! :)'});
        return;
      }
      if(!/[a-z]/i.test(credentials.username)) {
        setError({isError: !error, msg: "Only characters allowed as name.. unless you're Musk"});
        return;
      }
      if(/zerodeleo/i.test(credentials.username)) {
        setError({isError: !error, msg: "The name ZeroDeleo is preserved for the amazing developer"});
        return;
      }
      signUpDispatch(credentials);
    } catch (err) {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});
    }
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
    { error ? <Error error={error} /> : null }
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
