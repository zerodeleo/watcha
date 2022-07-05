import './css/index.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Dash from './components/Dash';
import NavBar from './components/layout/NavBar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SpeakWithDatabase from './components/play/SpeakWithDatabase';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Dash />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/play" element={<SpeakWithDatabase />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
