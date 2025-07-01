import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext.jsx';

const AdminRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // User is admin: allow access
    return children;
};

export default AdminRoute;
