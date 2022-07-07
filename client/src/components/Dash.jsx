import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// Actions to dispatch
import { getUsers } from '../store/actions/usersActions';
import { resetWatcha } from '../store/actions/watchaActions';

// Components
import WatchList from './WatchList';
import Button from './layout/Button';
import Chat from './Chat';

// Styles
import * as styles from '../css/styles';

const Dash = ({auth, watcha: {watchas, tag}, getUsersDispatch, users, resetWatchaDispatch}) => {
  const [toggleChat, setToggleChat] = useState(false);
  const navigate = useNavigate();
  if (!auth.uid) return <Navigate to="/signup" />;

  useEffect(() => {
    if(watchas.length > 0) {
      getUsersDispatch(watchas);
    }
  }, [])

  const handleClick = (e) => {
    const { name } = e.target;
    switch(name) {
      case 'enter_chat':
        navigate('/chat');
        break;
      case 'edit_watcha':
        resetWatchaDispatch();
        navigate('/watcha');
        break;
      default:
        console.log('nothing happened');
    }
  }
  
  const handleKeypress = e => {
    if (e.charCode === 13) {
      toggleChat(!toggleChat);
    }
  };

  return (
    <section className={`Dash ${styles.Dash}`} >
      { users.length > 1 ? 
        <>
          <h3 className={styles.h3}>{tag} has {users.length - 1} watches</h3> 
        </>
        : <><h3 style={{textAlign: 'center'}}>Waiting for watches in <br/>&#34;{tag}&#34;</h3><p className={styles.p}>Be the first one to write in the <b>{tag}</b> chat!<br/></p></> }
    <br/>
    <Button className={styles.button} name="enter_chat" txt="Enter chat" onClick={handleClick}/>
    <br/>
    <p>or</p>
    <br/>
    <Button className={styles.btnEditWatcha} name="edit_watcha" txt="edit watcha" onClick={handleClick}/>
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
  resetWatchaDispatch: () => dispatch(resetWatcha()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
