import client from '../../lib/api/client';

export const authApi = {
    login: async (email, password) => {
        return client.post('/auth/login', { email, password });
    },

    logout: async (refreshToken) => {
        return client.post('/auth/logout', { refreshToken });
    },

    refresh: async (refreshToken) => {
        return client.post('/auth/refresh', { refreshToken });
    },

    me: async () => {
        return client.get('/auth/me');
    }
};
