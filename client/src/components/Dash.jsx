import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useIntervalWhen } from "rooks";

// Actions to dispatch
import { getUsers } from '../store/actions/usersActions';

// Components
import WatchList from './WatchList';

// Styles
import * as styles from '../css/styles';

const Dash = ({auth, watcha: {watchas}, getUsersDispatch, users}) => {
  if (!auth.uid) return <Navigate to="/signup" />;

  useEffect(() => {
    if(watchas.length > 0) {
      getUsersDispatch(watchas);
    }
  }, [])

  return (
    <section className={`Dash ${styles.Dash}`}>
      <h3>You have {users.length - 1} watches</h3>
      <WatchList users={users.filter(user => user.uid !== auth.uid)} />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
  auth: state.auth,
  watcha: state.watcha,
  users: state.users.usersArr
}};

const mapDispatchToProps = (dispatch) => ({
  getUsersDispatch: (watchas) => dispatch(getUsers(watchas)),  
});

export default connect(mapStateToProps, mapDispatchToProps)(Dash);