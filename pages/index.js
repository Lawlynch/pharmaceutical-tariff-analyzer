import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useAuth, USER_TYPES } from '../components/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [contentSections, setContentSections] = useState([
    {
      id: 'homepage-intro',
      title: 'Homepage Introduction',
      content: '<h2>Welcome to the Pharmaceutical Tariff Analyzer</h2><p>This tool helps pharmaceutical companies evaluate if it\'s cheaper to source products in the US or outside even with tariffs.</p>'
    },
    {
      id: 'tariff-info',
      title: 'Tariff Information',
      content: '<h3>Current Tariff Rates</h3><p>The current pharmaceutical tariff rates range from 5% to 25% depending on the product category and country of origin.</p>'
    },
    {
      id: 'analysis-tool',
      title: 'Analysis Tool Description',
      content: '<h3>Supply Chain Optimizer</h3><p>Our supply chain optimizer uses advanced algorithms to calculate the most cost-effective sourcing strategy based on current tariff rates.</p>'
    }
  ]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleAdminDashboard = () => {
    router.push('/admin-protected');
  };

  return (
    <div>
      <Head>
        <title>Pharmaceutical Tariff Analyzer</title>
        <meta name="description" content="Analyze the impact of pharmaceutical tariffs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="app-header">
        <h1>Pharmaceutical Tariff Analyzer</h1>
        <div className="user-controls">
          {user.isAuthenticated ? (
            <>
              <span>Welcome, {user.username}!</span>
              {user.userType === USER_TYPES.ADMIN && (
                <button onClick={handleAdminDashboard} className="admin-button">Admin Dashboard</button>
              )}
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </>
          ) : (
            <Link href="/login" legacyBehavior>
              <a className="login-button">Login</a>
            </Link>
          )}
        </div>
      </header>

      <main>
        {!user.isAuthenticated ? (
          <div className="login-prompt">
            <h2>Please log in to access the Pharmaceutical Tariff Analyzer</h2>
            <p>This tool helps evaluate sourcing strategies in light of pharmaceutical tariffs.</p>
            <Link href="/login" legacyBehavior>
              <a className="login-button">Go to Login</a>
            </Link>
          </div>
        ) : (
          <div className="content-container">
            {contentSections.map(section => (
              <div key={section.id} className="content-section">
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </div>
            ))}
            
            <div className="analyzer-tool">
              <h2>Tariff Analysis Tool</h2>
              <p>Use our tool to analyze the impact of tariffs on your pharmaceutical supply chain.</p>
              
              {user.userType === USER_TYPES.ADMIN ? (
                <div className="admin-notice">
                  <p>As an admin user, you can update the HTML content of this page from the Admin Dashboard.</p>
                  <button onClick={handleAdminDashboard} className="admin-button">Go to Admin Dashboard</button>
                </div>
              ) : (
                <div className="user-notice">
                  <p>You are logged in as a regular user. You can view and use the tariff analyzer tool.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer>
        <p>Pharmaceutical Tariff Analysis Tool &copy; 2025</p>
      </footer>
    </div>
  );
}
