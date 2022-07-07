import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// Actions to dispatch
import { getUsers } from '../store/actions/usersActions';

// Components
import WatchList from './WatchList';
import Button from './layout/Button';
import Chat from './Chat';

// Styles
import * as styles from '../css/styles';

const Dash = ({auth, watcha: {watchas}, getUsersDispatch, users}) => {
  const [toggleChat, setToggleChat] = useState(false);
  const navigate = useNavigate();
  if (!auth.uid) return <Navigate to="/signup" />;

  useEffect(() => {
    if(watchas.length > 0) {
      getUsersDispatch(watchas);
    }
  }, [])

  const handleClick = (e) => {
    navigate('/chat');
  }

  const handleKeypress = e => {
    if (e.charCode === 13) {
      toggleChat(!toggleChat);
    }
  };

  return (
    <section className={`Dash ${styles.Dash}`} >
      { users.length > 1 ? 
        <h3 className={styles.h3}>You have {users.length - 1} watches</h3> 
        : <><h3>Waiting for watches ...</h3><p className={styles.p}>We will send you a notification once you get watched</p></> }
    <div className={styles.fixed}>
      <Button className={styles.button} txt="Enter chat" onClick={handleClick}/>
    </div>
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
