import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAccessToken, getRefreshToken, getUser, setSession, clearSession } from '../../lib/auth/tokenStorage';
import { authApi } from './api';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize from local storage on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const storedUser = getUser();
            const token = getAccessToken();

            if (storedUser && token) {
                setUser(storedUser);
                setIsAuthenticated(true);
                // Optionally: call /auth/me to refresh profile data
            }

            setIsLoading(false);
        };

        initializeAuth();
    }, []);

    const login = async (email, password) => {
        const response = await authApi.login(email, password);
        const { user, accessToken, refreshToken } = response.data;

        setSession({ accessToken, refreshToken, user });
        setUser(user);
        setIsAuthenticated(true);

        return user;
    };

    const logout = async () => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            try {
                await authApi.logout(refreshToken);
            } catch (error) {
                console.error('Logout failed:', error);
            }
        }

        clearSession();
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthStore = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthStore must be used within an AuthProvider');
    }
    return context;
};
