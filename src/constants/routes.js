export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    DEVICES: '/devices',
    DEVICE_DETAILS: (deviceKey) => `/devices/${deviceKey}`,
    BABY_DETAILS: (id) => `/baby/${id}`,
};
