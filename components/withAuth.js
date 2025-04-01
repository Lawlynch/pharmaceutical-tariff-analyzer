import React, { useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'next/router';

// Higher-order component for protected routes
export function withAuth(Component, requiredUserType = null) {
  return function ProtectedRoute(props) {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      // If not authenticated, redirect to login
      if (!user.isAuthenticated) {
        router.push('/login');
        return;
      }

      // If specific user type is required and user doesn't match
      if (requiredUserType && user.userType !== requiredUserType) {
        router.push('/');
        return;
      }
    }, [user, router]);

    // If authentication check is in progress, show loading
    if (!user.isAuthenticated) {
      return <div>Loading...</div>;
    }

    // If specific user type is required and user doesn't match
    if (requiredUserType && user.userType !== requiredUserType) {
      return <div>Unauthorized access</div>;
    }

    // If authenticated and authorized, render the component
    return <Component {...props} />;
  };
}

export default withAuth;
