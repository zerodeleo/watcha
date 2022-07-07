import './css/index.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Dash from './components/Dash';
import Chat from './components/Chat';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import SignedIn from './components/layout/SignedIn';
import Globe from './components/layout/Globe';
import SignUp from './components/auth/SignUp';
import * as styles from './css/styles'

// Actions
import { logIn } from './store/actions/authActions';

const App = ({ logInDispatch }) => {
  useEffect(() => {
    logInDispatch()
  }, [])

  return (
    <Router>
      <div className={`App ${styles.App}`}>
        <h1 className={styles.h1}>
          Watcha
        </h1>
        <Globe />
        <NavBar />
        <Routes>
          <Route exact path="/watcha" element={<SignedIn />} />
          <Route exact path="/" element={<Dash />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  console.log(state)
  return {
    auth: state.auth,
  }
}

const mapDispatchToProps = (dispatch) => ({
  logInDispatch: () => dispatch(logIn()),  
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
