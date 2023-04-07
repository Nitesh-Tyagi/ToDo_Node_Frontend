import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

function MainComponent() {
  const location = useLocation();
  const userID = location.state?.userID;

  return (
    <div>
      <nav>
        <ul>
          <li><Link to='/'>Login</Link></li>
          <li><Link to='/signup'>Sign Up</Link></li>
        </ul>
      </nav>
      <h1>Welcome to the home page!</h1>
      {userID && <p>Your userID: {userID}</p>}
    </div>
  );
}

export default MainComponent;
