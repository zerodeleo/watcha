import './css/index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Dash from './components/Dash';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import SignedIn from './components/layout/SignedIn';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import * as styles from './css/styles'

function App() {
  return (
    <Router>
      <div className={`App ${styles.App}`}>
        <NavBar />
        <Routes>
          <Route exact path="/watcha" element={<SignedIn />} />
          <Route exact path="/" element={<Dash />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
