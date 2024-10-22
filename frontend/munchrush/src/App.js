import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home'; 
import Aboutus from './components/Aboutus';
import UploadPage from './components/UploadPage'; // Import the new component


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/upload" element={<UploadPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;