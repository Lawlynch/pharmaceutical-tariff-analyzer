import React from 'react';
import { withAuth } from '../components/withAuth';
import { USER_TYPES } from '../components/AuthContext';

// Wrap the admin dashboard component with the withAuth HOC
// This ensures only admin users can access this page
const AdminDashboardWithAuth = withAuth(
  // Import the actual component implementation from admin.js
  require('./admin').default,
  // Specify that only ADMIN user type can access this page
  USER_TYPES.ADMIN
);

export default AdminDashboardWithAuth;
