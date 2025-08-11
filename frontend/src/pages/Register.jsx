import React, { useState } from 'react';
import API from '../api';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

const submit = async (e) => {
  e.preventDefault();
  try {
    const r = await API.post('/auth/register', { username, password });
    if (r.status === 201) {
      localStorage.setItem('token', r.data.token);  // Save token here
      nav('/');  // Navigate to TaskPage route
    } else {
      alert('Unexpected response, registration failed');
    }
  } catch (err) {
    alert(err.response?.data?.error || 'Registration failed');
  }
};


  return (
    <div style={{ maxWidth: 420, margin: '60px auto' }}>
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div style={{ marginTop: 12 }}>
          <button className="primary-btn" type="submit">Register</button>
        </div>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
