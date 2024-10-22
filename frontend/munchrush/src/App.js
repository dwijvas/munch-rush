import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import UploadPage from './components/UploadPage';
import OutputPage from './components/OutputPage'; // Import the OutputPage component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/output" element={<OutputPage />} /> {/* New Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;