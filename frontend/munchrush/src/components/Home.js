import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/logo.png'; 
import background from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/background2.jpg'; 


const Home = () => {
    const navigate = useNavigate(); // Define navigate using useNavigate
  
    const handleGetStartedClick = () => {
      navigate('/upload'); // Use navigate to go to the upload page
    };
  
    return (
      <div className="home-container" style={{ backgroundImage: `url(${background})` }}>
        <header className="home-header">
          <img src={logo} alt="Logo" className="home-logo" />
          <h1 className="home-title">MunchRush</h1>
          <nav className="home-nav">
            <a href="/aboutus" className="home-nav-link">About Us</a>
          </nav>
        </header>
        <main className="home-main">
          <div className="text-overlay">
            <h2>Turn Images into Recipes</h2>
            <button className="get-started-button" onClick={handleGetStartedClick}>
              GET STARTED
              <span className="play-icon">▶️</span>
            </button>
          </div>
        </main>
      </div>
    );
  }
  
  export default Home;