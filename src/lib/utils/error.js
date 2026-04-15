export const getApiErrorMessage = (error, fallback = 'An unexpected error occurred') => {
    if (error?.response?.data?.error?.message) {
        return error.response.data.error.message;
    }
    return fallback;
};
