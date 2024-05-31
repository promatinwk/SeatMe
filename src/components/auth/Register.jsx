// Register.jsx
import React, { useState } from 'react';
import BackgroundImage from '../../assets/background.png';
import { Link } from 'react-router-dom';
import "../../styles/register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Pobierz aktualną listę użytkowników z local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Sprawdź, czy użytkownik o podanym adresie email już istnieje
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      setError('User with this email already exists');
      return;
    }

    // Dodaj nowego użytkownika do listy użytkowników
    const newUser = { name, email, password };
    users.push(newUser);

    // Zapisz zaktualizowaną listę użytkowników do local storage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    // Możesz przekierować użytkownika gdzieś po zarejestrowaniu

    window.location.href = '/';
  };

  return (
    <div id='register-container'>
      <h1 className='app-name'>SeatMe</h1>
      <h2 className='sign-up-text'>Sign up</h2>
      <form onSubmit={handleSubmit} className='register-form'>
        <div className='form-div'>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name'/>
        </div>
        <div className='form-div'>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Email'/>
        </div>
        <div className='form-div'>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Password'/>
        </div>
        <div className='form-div'>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder='Confirm password'/>
        </div>
        <div className='form-div'>
          <input  className='checkbox-input' type="checkbox" name="informations" value="" onChange={handleChange} />
          <label className='label-register-form'>Yes, I want to receive information about new restaurants</label>
        </div>
        <div className='form-div'>
          <input className='checkbox-input' type="checkbox" name="discounts" value="" onChange={handleChange} />
          <label className='label-register-form'>Yes, I want to receive discounts</label>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Create an account</button>
        <button className='take-me-to-login'>Already signed up? Log in there</button>
      </form>
    </div>
  );
};

export default Register;
