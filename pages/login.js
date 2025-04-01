import React, { useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const [showUsernameTooltip, setShowUsernameTooltip] = useState(false);
  const [showPasswordTooltip, setShowPasswordTooltip] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // For regular users, only password is required
    // For admin users, both username and password are required
    if (password === 'Tariffbuster2025' && !username) {
      setError('Admin login requires a username');
      return;
    }
    
    if (!password) {
      setError('Password is required');
      return;
    }

    const result = login(username, password);
    
    if (result.success) {
      // Redirect based on user type
      if (result.userType === 'admin') {
        router.push('/admin-protected');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div>
      <Head>
        <title>Login - Pharmaceutical Tariff Analyzer</title>
        <meta name="description" content="Login to the Pharmaceutical Tariff Analyzer" />
      </Head>

      <main>
        <div className="login-container">
          <h1>Pharmaceutical Tariff Analyzer</h1>
          <h2>Login</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                Username 
                <span 
                  className="tooltip-icon" 
                  onMouseEnter={() => setShowUsernameTooltip(true)}
                  onMouseLeave={() => setShowUsernameTooltip(false)}
                >
                  ?
                </span>
              </label>
              {showUsernameTooltip && (
                <div className="tooltip">
                  Username is required for admin login only. Regular users can leave this blank.
                </div>
              )}
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username (required for admin)"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Password
                <span 
                  className="tooltip-icon" 
                  onMouseEnter={() => setShowPasswordTooltip(true)}
                  onMouseLeave={() => setShowPasswordTooltip(false)}
                >
                  ?
                </span>
              </label>
              {showPasswordTooltip && (
                <div className="tooltip">
                  Password is required for all users. Admin password is different from regular user password.
                </div>
              )}
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="login-help">
            <p>For admin access, use the admin password: Tariffbuster2025 (username required)</p>
            <p>For regular user access, use the regular user password: pharma2025 (username optional)</p>
          </div>
          <div className="back-link">
            <Link href="/" legacyBehavior>
              <a>Back to Home</a>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
