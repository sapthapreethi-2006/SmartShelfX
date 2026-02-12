import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../Services/LoginService';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(username, password);
      const role = response.data.role;

      console.log('Login successful, username:', username);
      console.log('Full response:', response.data);
      
      // Store all user data from login response
      window.localStorage.setItem('role', role);
      window.localStorage.setItem('username', username);
      window.localStorage.setItem('userRole', role);
      window.localStorage.setItem('personalName', response.data.personalName || username);
      window.localStorage.setItem('email', response.data.email || response.data.emailId || response.data.mail || '');
      window.localStorage.setItem('userId', response.data.userId || response.data.username);
      window.localStorage.setItem('userDetails', JSON.stringify(response.data));
      
      console.log('Stored to localStorage - username:', window.localStorage.getItem('username'));

      if (role === 'ADMIN') {
        navigate('/admin');
      } else if (role === 'MANAGER') {
        navigate('/manager');
      } else if (role === 'VENDOR') {
        navigate('/vendor');
      } else {
        setError('Invalid role received from server');
        window.localStorage.removeItem('role');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">User Login Page</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
        </form>

        <button onClick={handleRegister} className="register-button">
          Register New User
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
