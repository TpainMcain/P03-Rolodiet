// Import necessary modules and components
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Navbar from "./components/Navbar";
import './App.css';
import MainPage from './components/MainPage';
import Features from './components/Features';
import About from './components/About';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';

// Create an instance of Apollo Client for GraphQL communication
const client = new ApolloClient({
  uri: 'https://good-eats-b2abe2613d0c.herokuapp.com/graphql', // GraphQL server endpoint
  cache: new InMemoryCache(), // Using an in-memory cache for caching GraphQL data
});

function App() {
  return (
    // Provide the Apollo Client instance to child components
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />  {/* Navigation bar component */}
          <Routes>
            {/* Define the application routes and their corresponding components */}
            <Route path="/" element={<MainPage />} />            {/* Home/Main page */}
            <Route path="/features" element={<Features />} />    {/* Features page */}
            <Route path="/about" element={<About />} />          {/* About page */}
            <Route path="/login" element={<LoginForm />} />      {/* Login form page */}
            <Route path="/register" element={<SignupForm />} />  {/* Registration form page */}
            <Route path="*" element={<MainPage />} />            {/* Catch-all route, redirects to Main page */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

// Export the main App component to be used in index.js or other entry points
export default App;
