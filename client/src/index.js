// Import necessary modules and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create a concurrent root for the application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the main App component inside React's Strict Mode
// Strict Mode checks for potential problems in the app during the development phase
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Collect performance metrics of the app using the Web Vitals API
// Useful for analyzing the user experience of the app
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
