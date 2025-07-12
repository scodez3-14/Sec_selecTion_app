import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './Login.css';
import { auth } from '../firebase'; // instead of getAuth()

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(); // call parent to show admin panel
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Admin Login</h2>

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Login</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
