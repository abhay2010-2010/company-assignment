import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navlink=useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = 'https://company-assignment-h9vq.onrender.com/user/login';
    try {
      const payload = { email: formData.email, password: formData.password };
      const response = await axios.post(url, payload);
      console.log(response.data);
      if (response.data) {
        localStorage.setItem('token', response.data);
        alert('Login successful! Token stored in localStorage.');
        navlink("/")
      } else {
        alert(response.data.message || 'Login successful');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred during login');
    }
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const url = 'https://company-assignment-h9vq.onrender.com/user/register';
    
    try {
        const payload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };
        
        const response = await axios.post(url, payload);
        console.log('Registration successful:', response.data);
        alert(response.data.message || 'Registration successful');
    } catch (error) {
        console.error('Registration error:', error);
        alert(error.response?.data?.message || 'Registration failed. Please try again.');
    }
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
};

  const handleSubmit = isLogin ? handleLogin : handleRegister;

  return (
    <>
  
    <div className="form-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleInputChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleInputChange}
        />
        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
      </form>
      <div className="form-switch">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a href="#" onClick={toggleForm}>
          {isLogin ? 'Sign up' : 'Login'}
        </a>
      </div>
    </div>
    </>
  );
}