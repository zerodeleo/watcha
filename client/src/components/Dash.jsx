import React, { useEffect, useState, useContext } from 'react';
import { connect } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

// Actions to dispatch
import { getUsers } from '../store/actions/usersActions';
import { resetWatcha } from '../store/actions/watchaActions';

// Components
import Button from './layout/Button';
import { Context } from './Context';
import Error from './error/Error';

// Styles
import * as styles from '../css/styles';

const Dash = ({auth, watcha: {watchas, tag}, getUsersDispatch, users, resetWatchaDispatch}) => {
  const { setToggleNavBar } = useContext(Context);
  const navigate = useNavigate();
  const [error, setError] = useState({isError: false, msg: ''});
  if (!auth.uid) return <Navigate to="/signup" />;

  useEffect(() => {
    try {
      if(watchas.length > 0) {
        getUsersDispatch(watchas);
      }
    } catch (err) {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});
    }
  }, [])

  const handleClick = (e) => {
    const { name } = e.target;
    try {
      switch(name) {
        case 'enter_chat':
          setToggleNavBar(false);
          navigate('/chat');
          break;
        case 'edit_watcha':
          resetWatchaDispatch();
          navigate('/watcha');
          break;
        default:
          console.log('nothing happened');
      }
    } catch (err) {
      console.error(err);
      setError({isError: !error, msg: 'Something happened, plz reload...'});      
    }
  }


  return (
    <section className={`Dash ${styles.Dash}`} >
      { users.length > 1 ? 
        <>
          <h3 className={styles.h3}>{tag.toUpperCase()} has <br/>{users.length - 1} watches</h3><p className={styles.p}>Welcome to the <b>{tag.toUpperCase()}</b> chat!<br/></p>
        </>
        : <><h3 style={{textAlign: 'center'}}>Waiting for watches in <br/>&#34;{tag.toUpperCase()}&#34;</h3><p className={styles.p}>Be the first one to write in the <b>{tag.toUpperCase()}</b> chat!<br/></p></> }
      <br/>
      <Button className={styles.button} name="enter_chat" txt="Enter chat" onClick={handleClick}/>
      <br/>
      <p>or</p>
      <br/>
      <Button className={styles.btnEditWatcha} name="edit_watcha" txt="edit watcha" onClick={handleClick}/>
      { error ? <Error error={error} /> : null }
    </section>
  );
};

const mapStateToProps = (state) => {
  console.log(state, ' dash')
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
