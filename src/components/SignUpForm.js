import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function SignUpForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [jwt, setJwt] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/users/signup', {
        username,
        email,
        password,
      });
      const { id } = response.data;
      if (id > 0) {
        setJwt(id);
        // Redirect to home page
        navigate('/home', { state: { userID: response.data.ID , username: username} });
      } else {
        setError('Username or email already exists');
      }
    } catch (error) {
      // console.error(error);
      // setError('Failed to sign up');
    }
  };

  return (
    <div>
        <nav>
        <ul className='Navv'>
          <li className='log'><Link to='/'>Login</Link></li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit} className='formDiv'>
        <h2>Sign up</h2>
        <br></br>
        <div>
          <label>
            Username :&nbsp;&nbsp;
            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            &nbsp;&nbsp;&nbsp;&nbsp;Email :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Password :&nbsp;&nbsp;
            <input type="text" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
        </div>
        <button type="submit">Sign up</button>
        <br></br>
        {error && (
            <div className='formDiv' style={{ backgroundColor: '#ffcccc', color: '#990000', padding: '0px 25px 0px 25px'}}>
            <p>{error}</p>
            </div>
        )}
      </form>
      
      {jwt && <div>Logged in with JWT: {jwt}</div>}
    </div>
  );
}

export default SignUpForm;
