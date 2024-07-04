import React, { useState } from 'react';
import axios from 'axios';

function App() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? 'https://company-assignment-h9vq.onrender.com/user/login'
      : 'https://company-assignment-h9vq.onrender.com/user/register';

    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.username, email: formData.email, password: formData.password };

      const response = await axios.post(url, payload);
      console.log(response.data);
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Success! Token stored in localStorage.');
      } else {
        alert(response.data.message || 'Operation successful');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
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
  );
}

export default App;