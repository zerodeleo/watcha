import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Components
import Form from './Form';
import Description from './Description';
import Error from './Error';

// Styles
import * as styles from '../../css/styles';

// Actions
import { addWatcha } from '../../store/actions/watchaActions';

const SignedIn = ({ auth, addWatchaDispatch, watcha }) => {
  if (!auth.uid) return <Navigate to="/signup" />;
  if (watcha.wid) return <Navigate to="/" />;

  const [error, setError] = useState({isError: false, msg: ''});
  const [newWatcha, setNewWatcha] = useState('');

  const handleChange = (e) => {
    setError(false);
    const { value } = e.target;
    if(/ /.test(value)) return;
    setNewWatcha(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if(!/[a-z]/i.test(newWatcha)) {
        setError({isError: !error, msg: "Please type a word"});
        return;
      }
      addWatchaDispatch(newWatcha, auth.uid);
      <Navigate to="/" />;
    } catch (err) {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});
    }
  };

  return( 
  <section className={`SignedIn ${styles.SignedIn}`}>
    <Description txt='Watcha thinking bout!?' />
    < Form
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      value={newWatcha}
      name='watcha'
      txt='Enter'
      label='Type a word in the input field below :'
    />
    { error ? <Error error={error} /> : null }
  </section>);
}

const mapStateToProps = (state) => {
  return {
  auth: state.auth,
  watcha: state.watcha
}};

const mapDispatchToProps = (dispatch) => ({
  addWatchaDispatch: (watcha, uid) => dispatch(addWatcha(watcha, uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);
