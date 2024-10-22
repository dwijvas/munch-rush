// OutputPage.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OutputPage.css';
import logo from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/logo.png';

const OutputPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients } = location.state || { ingredients: [] };
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (ingredients.length > 0) {
      // Generate a recipe based on the recognized ingredients
      const generatedRecipe = generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    }
  }, [ingredients]);

  // Dummy function to simulate recipe generation (replace with actual logic or API call)
  const generateRecipe = (ingredients) => {
    // This function returns a mock recipe for demonstration purposes
    return {
      title: 'PLACEHOLDER Pasta with Tomato and Basil',
      ingredients: [
        '200g Pasta',
        '2 Tomatoes, chopped',
        '1 Onion, finely chopped',
        '2 cloves Garlic, minced',
        '2 tbsp Olive Oil',
        'Fresh Basil Leaves',
        'Salt and Pepper to taste'
      ],
      instructions: [
        'Boil the pasta in salted water according to package instructions.',
        'Heat olive oil in a pan and sauté onions and garlic until translucent.',
        'Add chopped tomatoes and cook for 5-7 minutes until they break down.',
        'Mix in the cooked pasta and fresh basil leaves. Season with salt and pepper.',
        'Serve hot and enjoy your delicious pasta.'
      ]
    };
  };

  return (
    <div className="output-page">
      <header className="output-header">
        <img src={logo} alt="Logo" className="output-logo" />
        <h1 className="output-title">MunchRush</h1>
        <nav className="output-nav">
          <a href="/" className="output-nav-link">Home</a>
          <a href="/aboutus" className="output-nav-link">About Us</a>
        </nav>
      </header>
      <main className="output-main">
        <div className="output-content">
          <h2>Recognized Ingredients</h2>
          {ingredients.length > 0 ? (
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ) : (
            <p>No ingredients recognized. Please try again.</p>
          )}
          {recipe && (
            <>
              <h2>Suggested Recipe: {recipe.title}</h2>
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h3>Instructions:</h3>
              <ol>
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </>
          )}
          <button onClick={() => navigate('/upload')}>Upload Another Image</button>
        </div>
      </main>
    </div>
  );
};

export default OutputPage;