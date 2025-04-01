import React from 'react';
import { withAuth } from '../components/withAuth';
import { USER_TYPES } from '../components/AuthContext';

// Create a protected dashboard page for regular users
function UserDashboard() {
  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <p>Welcome to the Pharmaceutical Tariff Analyzer user dashboard.</p>
      
      <div className="dashboard-content">
        <h2>Tariff Analysis Tools</h2>
        <p>As a regular user, you can access the following tools:</p>
        
        <div className="tool-card">
          <h3>Supply Chain Optimizer</h3>
          <p>Evaluate if it's cheaper to source products in the US or outside even with tariffs.</p>
          <button>Launch Tool</button>
        </div>
        
        <div className="tool-card">
          <h3>Tariff Impact Calculator</h3>
          <p>Calculate the financial impact of tariffs on your pharmaceutical products.</p>
          <button>Launch Tool</button>
        </div>
        
        <div className="tool-card">
          <h3>Market Analysis</h3>
          <p>Analyze market trends and tariff impacts across different regions.</p>
          <button>Launch Tool</button>
        </div>
      </div>
    </div>
  );
}

// Wrap the user dashboard component with the withAuth HOC
// This ensures only authenticated users can access this page
const UserDashboardWithAuth = withAuth(
  UserDashboard,
  // Allow any authenticated user (both regular and admin)
  null
);

export default UserDashboardWithAuth;
