import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Aboutus from './components/Aboutus';
import UploadPage from './components/UploadPage';
import OutputPage from './components/OutputPage';
import Chat from './components/Chat'; // Import the Chat component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/output" element={<OutputPage />} />
          <Route path="/chat" element={<Chat />} /> {/* New Chat Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;