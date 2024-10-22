import React from 'react';
import './Aboutus.css';
import logo from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/logo.png'; 
import background from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/background2.jpg'; 

const Aboutus = () => {
  return (
    <div className="aboutus-container" style={{ backgroundImage: `url(${background})` }}>
      <header className="aboutus-header">
        <img src={logo} alt="Logo" className="aboutus-logo" />
        <h1 className="aboutus-title">About MunchRush</h1>
        <nav className="aboutus-nav">
          <a href="/" className="aboutus-nav-link">Home</a>
          <div className="menu-icon">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </nav>
      </header>
      <main className="aboutus-main">
        <div className="text-overlay">
          <h2>Who We Are</h2>
          <p>
            MunchRush is a platform that helps food enthusiasts turn their images into recipes,
            providing an easy and interactive way to explore and create culinary delights.
          </p>
          <p>
            Our mission is to make cooking accessible to everyone, inspiring people to get
            creative in the kitchen and discover new tastes and flavors.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Aboutus;