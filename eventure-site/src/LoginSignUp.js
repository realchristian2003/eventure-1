import React, { useState } from 'react';
import './LoginSignUp.css';  // Assuming you have a separate CSS file for styling

function LoginSignUp({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // For now, assume the login is always successful
    setIsLoggedIn(true); // This will trigger the transition to the app
  };

  return (
    <div className="login-signup-container">
      <header className="login-signup-header">
        <div className="logo">eventure</div>
      </header>

      <div className="login-form-container">
        <h2>Welcome Back!</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">Login</button>

          <div className="signup-text">
            <p>Don't have an account? <span onClick={() => alert('Sign-up feature not implemented')}>Sign-up here</span></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginSignUp;
