import client from '../../lib/api/client';

export const devicesApi = {
    getDevices: async () => {
        return client.get('/devices');
    },

    getDevice: async (deviceKey) => {
        return client.get(`/devices/${deviceKey}`);
    },

    upsertDevice: async (data) => {
        return client.post('/devices', data);
    },

    patchDevice: async (deviceKey, data) => {
        return client.patch(`/devices/${deviceKey}`, data);
    },

    getAssignment: async (deviceKey) => {
        return client.get(`/devices/${deviceKey}/assignment`);
    },

    getAssignmentHistory: async (deviceKey, limit = 25) => {
        return client.get(`/devices/${deviceKey}/assignments`, { params: { limit } });
    },

    assignDevice: async (deviceKey, data) => {
        return client.post(`/devices/${deviceKey}/assignment`, data);
    },

    unassignDevice: async (deviceKey, data = {}) => {
        return client.post(`/devices/${deviceKey}/assignment/unassign`, data);
    },

    generateCredentials: async (deviceKey, clientId) => {
        return client.post(`/devices/${deviceKey}/credentials`, { clientId });
    }
};
