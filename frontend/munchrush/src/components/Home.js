import React from 'react';
import './Home.css';
import logo from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/logo.png'; 
import background from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/background2.jpg'; 

const Home = () => {
  return (
    <div className="home-container" style={{ backgroundImage: `url(${background})` }}>
      <header className="home-header">
        <img src={logo} alt="Logo" className="home-logo" />
        <h1 className="home-title">MunchRush</h1>
        <nav className="home-nav">
          <a href="/about" className="home-nav-link">About Us</a>
          <div className="menu-icon">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </nav>
      </header>
      <main className="home-main">
        <div className="text-overlay">
          <h2>Turn Images into Recipes</h2>
          <button className="get-started-button">
            GET STARTED
            <span className="play-icon">▶️</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;