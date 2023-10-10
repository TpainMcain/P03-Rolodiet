import React from 'react';
import './Features.css';

// List of features and tech-stack descriptions
const featuresList = [
  'Intuitive UI: Our user-friendly interface makes it easy to navigate and discover new recipes.',
  'Recipe Discovery: Our advanced search capabilities allow you to discover recipes from around the world.',
  'Save Your Favorites: Keep track of your favorite recipes and access them anytime, anywhere.',
  'MERN Stack: Good Eats is built on the MERN stack, a powerful combination of MongoDB, Express.js, React.js, and Node.js.',
  'MongoDB: A NoSQL database that provides high performance, high availability, and easy scalability.',
  'Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
  'React.js: A JavaScript library for building user interfaces, allowing us to build the complex, interactive UI of Good Eats.',
  'Node.js: An open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a web browser.'
];

/**
 * Features component: Describes the features and tech-stack of Good Eats.
 */
const Features = () => {
  return (
    <div className="features">
      <div className="content">
        <Header title="Good Eats" subtitle="Discover and save your favorite recipes!" />
        <Description text="Good Eats is a comprehensive, full-stack web application built with the MERN (MongoDB, Express.js, React.js, and Node.js) tech stack. It provides an intuitive platform for users to discover and save their favorite recipes." />
        <FeaturesList features={featuresList} />
      </div>
    </div>
  );
};

/**
 * Header component: Displays the main title and subtitle.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The main title.
 * @param {string} props.subtitle - The subtitle.
 */
const Header = ({ title, subtitle }) => (
  <>
    <h1>{title}</h1>
    <h2>{subtitle}</h2>
  </>
);

/**
 * Description component: Displays the main description text.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.text - The description text.
 */
const Description = ({ text }) => (
  <p>{text}</p>
);

/**
 * FeaturesList component: Lists all the features and tech descriptions.
 * 
 * @param {Object} props - The properties passed to the component.
 * @param {string[]} props.features - The list of features/descriptions.
 */
const FeaturesList = ({ features }) => (
  <ul>
    {features.map((feature, index) => (
      <li key={index}>{feature}</li>
    ))}
  </ul>
);

export default Features;
