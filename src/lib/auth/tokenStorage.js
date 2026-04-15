export const ACCESS_TOKEN_KEY = 'mamawatch_access_token';
export const REFRESH_TOKEN_KEY = 'mamawatch_refresh_token';
export const USER_KEY = 'mamawatch_user';

export const getAccessToken = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    try {
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};

export const setSession = ({ accessToken, refreshToken, user }) => {
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};
