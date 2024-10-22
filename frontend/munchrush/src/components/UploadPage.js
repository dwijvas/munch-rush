// UploadPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadPage.css';
import logo from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/logo.png';

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      // Simulate ingredient recognition (replace with actual model inference)
      const recognizedIngredients = await recognizeIngredients(selectedFile);
      // Navigate to the output page with the recognized ingredients
      navigate('/output', { state: { ingredients: recognizedIngredients } });
    } else {
      alert('Please select a file to upload');
    }
  };

  // Dummy function to simulate recognition (replace with actual recognition logic)
  const recognizeIngredients = async (file) => {
    // Here you would add the logic to run your model on the uploaded file
    // For demonstration, let's return a static list
    return ['Onion', 'Tomato', 'Lettuce', 'Cucumber' ];
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