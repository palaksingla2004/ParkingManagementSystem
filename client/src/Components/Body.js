import React from 'react';
import "../styles/Body.css";

const Body = () => {
  return (
    <div className="body">
      <h1>Welcome to Our Application</h1>
      <p>
        This is the main content area where you can find various features and information.
      </p>
      <p>
        Explore our services, make bookings, manage your account, and much more!
      </p>
      <button>Get Started</button>
    </div>
  );
};

export default Body;