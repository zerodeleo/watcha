import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

// Components
import Form from './Form';
import Description from './Description';

// Styles
import * as styles from '../../css/styles';

// Actions
import { addWatcha } from '../../store/actions/watchaActions';

const SignedIn = ({ auth, addWatchaDispatch, watcha }) => {
  if (!auth.uid) return <Navigate to="/signup" />;
  if (watcha.wid) return <Navigate to="/" />;

  const [newWatcha, setNewWatcha] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    if(/ /.test(value)) return;
    setNewWatcha(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addWatchaDispatch(newWatcha, auth.uid);
    <Navigate to="/" />;
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
