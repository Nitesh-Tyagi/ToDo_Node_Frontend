import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [jwt, setJwt] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const response = await axios.post('http://localhost:8000/api/users/login', {
        username,
        password,
      });
      const { ID } = response.data;
      if (ID > 0) {
        setJwt(ID);
        setJwt(username);
        // Redirect to home page
        // window.location.href = '/';
        navigate('/home', { state: { userID: response.data.ID , username: username} });
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('Failed to log in');
    }
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <nav>
        <ul className='Navv'>
          <li className='log'><Link to='/signup'>Sign Up</Link></li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit} className='formDiv'>
        <h2>Login</h2>
        <br></br>
        <div>
          <label>
            Username :&nbsp;&nbsp;
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
        </div>
        <div>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            Password :&nbsp;&nbsp;
            <div style={{position: 'relative'}}>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} />
              <button type="button" style={{position: 'absolute', right: '0px', top: '40%', transform: 'translateY(-50%)'}} onClick={handleTogglePassword}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
          </label>
        </div>
        <button type="submit">Log in</button>
        <br></br>
        {error && (
            <div className='formDiv' style={{ backgroundColor: '#ffcccc', color: '#990000', padding: '0px 25px 0px 25px' }}>
            <p>{error}</p>
            </div>
        )}
      </form>
      
      {jwt && <div>Logged in with JWT: {jwt}</div>}
    </div>
  );
}

export default LoginForm;
