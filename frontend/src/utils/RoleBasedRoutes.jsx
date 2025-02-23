import React from 'react';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const RoleBasedRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth();

    // Show a loading state while authentication is being checked
    if (loading) {
        return <div>Loading...</div>;
    }

    // Redirect to login if the user is not authenticated
    if (!user) {
        console.log("User not found, redirecting to login...");
        return <Navigate to="/login" />;
    }

    // Normalize roles to lowercase for case-insensitive comparison
    const userRole = user.role.toLowerCase();
    const allowedRoles = requiredRole.map(role => role.toLowerCase());

    // Check if the user's role is allowed to access the route
    if (!allowedRoles.includes(userRole)) {
        console.log("Unauthorized access, redirecting based on role...");

        // Redirect to the appropriate dashboard based on the user's role
        if (userRole === 'admin') {
            return <Navigate to="/admin-dashboard" />;
        } else if (userRole === 'employee') {
            return <Navigate to="/employee-dashboard" />;
        } else {
            // Fallback for unknown roles (redirect to login or a default page)
            return <Navigate to="/login" />;
        }
    }

    // If the user's role is allowed, render the children (protected content)
    return children;
};

export default RoleBasedRoutes;