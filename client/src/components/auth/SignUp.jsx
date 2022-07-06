import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Components
import Input from '../layout/Input';
import Button from '../layout/Button';
import Error from '../error/Error';

// Actions
import { signUp } from '../../store/actions/authActions';

const SignUp = ({ signUpDispatch, authError, auth }) => {
  if (auth.uid) return <Navigate to="/" />;

  const [credentials, setCredentials] = useState({
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signUpDispatch(credentials);
  };


  console.log('SignUp Component')
  return (
    <section className="SignUp">
      { authError
        ? <Error mess age={authError} />
        : (
          <form onSubmit={handleSubmit}>
            <Input
              onChange={handleChange}
              type="text"
              name="username"
              value={credentials.username}
            />
            <Button
              onSubmit={handleSubmit}
              txt="enter"
            />
          </form>
        )}
    </section>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
  authError: state.auth.authError,
  auth: state.auth,
}};

const mapDispatchToProps = (dispatch) => ({
  signUpDispatch: (credentials) => dispatch(signUp(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
