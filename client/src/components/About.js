import React from 'react';
import './About.css';

/**
 * PersonCard component that displays details of a team member.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.name - The name of the person.
 * @param {string} props.role - The role/title of the person.
 * @param {string} props.description - A brief description or bio of the person.
 * @returns {JSX.Element} Rendered person card.
 */
const PersonCard = ({ name, role, description }) => (
  <div className="person-card">
    <h2>{name}</h2>
    <h3>{role}</h3>
    <p>{description}</p>
  </div>
);

/**
 * About component that displays the details of team members using the PersonCard component.
 *
 * @returns {JSX.Element} Rendered about section.
 */
const About = () => (
  <div className="about-container">
    <div className="about">
      <h1>About Our Team:</h1>
      <PersonCard 
        name="Mohammed Bhimjee"
        role="Full-Stack Developer Student"
        description="Lorem ipsum... est laborum."
      />
      <PersonCard 
        name="Lauren Wollaston"
        role="Full-Stack Developer Student"
        description="Lorem ipsum... est laborum."
      />
      <PersonCard 
        name="Jacob Fairweather"
        role="Full-Stack Developer Student"
        description="Lorem ipsum... est laborum."
      />
      <PersonCard 
        name="Trevor Pratt"
        role="Full-Stack Developer Student"
        description="Lorem ipsum... est laborum."
      />
    </div>
  </div>
);

export default About;
