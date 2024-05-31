// Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      alert('Login successful!');
      localStorage.setItem('loggedInUser', JSON.stringify(user));
    } else {
      alert('Invalid email or password!');
    }
    window.location.href = '/restaurants';
  };

  return (
    <div id='login-container'>
      <h1 className='app-name'>SeatMe</h1>
      <h2 className='log-in-text'>Log In</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <div className='form-div'>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='form-div'>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        <Link to='/register'>
        <button>Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
