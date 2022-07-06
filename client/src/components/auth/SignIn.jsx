import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Components
import Input from '../layout/Input';
import Button from '../layout/Button';
import Error from '../error/Error';

// Actions
import { signIn } from '../../store/actions/authActions';

function SignIn({ signInDispatch, authError, auth }) {
  const [credentials, setCredentials] = useState({
    username: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInDispatch(credentials);
  };

  if (auth.uid) return <Navigate to="/" />;

  return (
    <section className="SignIn">
      { authError
        ? <Error message={authError} />
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
              txt="sign in"
              type="submit"
            />
          </form>
        )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  authError: state.auth.authError,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  signInDispatch: (credentials) => dispatch(signIn(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
