// Chat.js
import React, { useEffect, useState } from 'react';
import './Chat.css';
import logo from '/Users/dwijv/Documents/GitHub/munch-rush/frontend/munchrush/src/pictures/logo.png';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // The example pasta recipe to be included as the initial message
  const initialRecipeMessage = {
    text: `
      Here's a recipe suggestion for Pasta with Tomato and Basil:
      
      Ingredients:
      - 200g Pasta
      - 2 Tomatoes, chopped
      - 1 Onion, finely chopped
      - 2 cloves Garlic, minced
      - 2 tbsp Olive Oil
      - Fresh Basil Leaves
      - Salt and Pepper to taste
      
      Instructions:
      1. Boil the pasta in salted water according to package instructions.
      2. Heat olive oil in a pan and sauté onions and garlic until translucent.
      3. Add chopped tomatoes and cook for 5-7 minutes until they break down.
      4. Mix in the cooked pasta and fresh basil leaves. Season with salt and pepper.
      5. Serve hot and enjoy your delicious pasta.
    `,
    sender: 'system'
  };

  // More detailed instructions
  const detailedInstructionsMessage = {
    text: `
      For more detailed instructions on making the Pasta with Tomato and Basil:
      
      1. **Preparing the Ingredients**:
         - Start by washing the tomatoes and basil leaves. Chop the tomatoes into small pieces, finely chop the onion, and mince the garlic.
         - If using whole basil leaves, remove the stems.
      
      2. **Boiling the Pasta**:
         - Fill a large pot with water, add a pinch of salt, and bring it to a boil.
         - Once boiling, add the pasta and cook according to the package instructions, usually around 8-10 minutes, stirring occasionally.
         - When the pasta is al dente (firm to the bite), drain it and set it aside, reserving a small cup of pasta water.
      
      3. **Cooking the Sauce**:
         - Heat 2 tablespoons of olive oil in a large pan over medium heat.
         - Add the chopped onion and sauté for about 3-4 minutes until it becomes translucent.
         - Add the minced garlic and cook for another minute, being careful not to burn it.
         - Stir in the chopped tomatoes and cook for 5-7 minutes, allowing the tomatoes to break down and create a sauce. If the sauce is too thick, add some of the reserved pasta water.
      
      4. **Combining the Pasta and Sauce**:
         - Add the drained pasta to the pan with the sauce, tossing well to coat.
         - Tear the fresh basil leaves and add them to the pasta, stirring gently to incorporate.
         - Season with salt and freshly ground black pepper to taste.
      
      5. **Serving the Pasta**:
         - Serve the pasta immediately, garnished with extra basil leaves or a drizzle of olive oil if desired. Enjoy!
    `,
    sender: 'system'
  };

  useEffect(() => {
    // Add the initial recipe message when the component mounts
    setMessages([initialRecipeMessage]);
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputValue('');

      // Check if the user is asking for more detailed instructions
      if (/detailed instructions|more details|step by step/i.test(inputValue)) {
        setTimeout(() => {
          setMessages((prevMessages) => [...prevMessages, detailedInstructionsMessage]);
        }, 1000);
      } else {
        // Simulate a generic response from the system
        setTimeout(() => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'This is a response from MunchRush.', sender: 'system' },
          ]);
        }, 1000);
      }
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <img src={logo} alt="Logo" className="chat-logo" />
        <h1 className="chat-title">MunchRush Chat</h1>
        <nav className="chat-nav">
          <a href="/" className="chat-nav-link">Home</a>
          <a href="/aboutus" className="chat-nav-link">About Us</a>
        </nav>
      </header>
      <main className="chat-main">
        <div className="chat-content">
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'system-message'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">Send</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;