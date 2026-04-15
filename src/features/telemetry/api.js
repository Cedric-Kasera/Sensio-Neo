import client from '../../lib/api/client';

export const telemetryApi = {
    getLatestTelemetry: async (deviceKey) => {
        return client.get(`/telemetry/latest/${deviceKey}`);
    },

    getTelemetryHistory: async (deviceKey, limit = 25) => {
        return client.get(`/telemetry/device/${deviceKey}`, { params: { limit } });
    },

    getAlertHistory: async (deviceKey, limit = 25) => {
        return client.get(`/telemetry/device/${deviceKey}/alerts`, { params: { limit } });
    }
};
