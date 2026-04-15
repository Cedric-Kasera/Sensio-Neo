import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks';

export function PrivateRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex bg-[var(--color-bg-base)] h-screen w-screen items-center justify-center space-x-2">
                <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children ? children : <Outlet />;
}

export function PublicOnlyRoute({ children }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        // Empty return while checking auth on public routes
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children ? children : <Outlet />;
}

export function AdminRoute({ children }) {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) return null;

    if (!isAuthenticated || user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return children ? children : <Outlet />;
}
