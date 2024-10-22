// UploadPage.js
import React, { useState } from 'react';
import './UploadPage.css';
import logo from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/logo.png'; // Full path to the logo

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Handle the file upload logic here, e.g., send it to the server
      console.log('File selected:', selectedFile);
    } else {
      alert('Please select a file to upload');
    }
  };

  return (
    <div className="upload-page">
      <header className="upload-header">
        <img src={logo} alt="Logo" className="upload-logo" />
        <h1 className="upload-title">MunchRush</h1>
        <nav className="upload-nav">
          <a href="/" className="upload-nav-link">Home</a>
          <a href="/aboutus" className="upload-nav-link">About Us</a>
        </nav>
      </header>
      <main className="upload-main">
        <div className="upload-content">
          <h2>Upload an Image of Ingredients</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} accept="image/*" />
            <button type="submit">Upload</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;