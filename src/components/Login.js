import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock users: Admin requires password, staff does not
  const USERS = [
    { username: 'admin', password: 'saidben123', role: 'admin' },
    { username: 'staff', role: 'staff' } // No password needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = USERS.find(u => u.username === username);

      if (user) {
        // Validate password ONLY for admin
        if (user.role === 'admin' && user.password !== password) {
          toast.error('Admin password incorrect');
        } else {
          onLogin(user); // Staff login bypasses password check
        }
      } else {
        toast.error('Username not found');
      }

      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <h2>Stock Management Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
        <input
          type="password"
          placeholder="Password (admin only)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="demo-hint">
        <p>Accounts:</p>
        <ul>
          <li>Admin: <strong>admin</strong> / Password: <strong></strong></li>
          <li>Staff: <strong>staff</strong> / No password required</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;