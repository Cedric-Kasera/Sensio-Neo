import { useQuery } from '@tanstack/react-query';
import { telemetryApi } from './api';
import { mapTelemetry, mapAlert } from './mappers';

export const useLatestTelemetry = (deviceKey) => {
    return useQuery({
        queryKey: ['telemetry', 'latest', deviceKey],
        queryFn: async () => {
            const response = await telemetryApi.getLatestTelemetry(deviceKey);
            return mapTelemetry(response.data);
        },
        enabled: !!deviceKey,
        // Note: Do not retry if missing, might just be temporarily absent
        retry: false,
    });
};

export const useTelemetryHistory = (deviceKey, limit = 25) => {
    return useQuery({
        queryKey: ['telemetry', 'history', deviceKey, { limit }],
        queryFn: async () => {
            const response = await telemetryApi.getTelemetryHistory(deviceKey, limit);
            return (response.data || []).map(mapTelemetry);
        },
        enabled: !!deviceKey,
    });
};

export const useAlertHistory = (deviceKey, limit = 25) => {
    return useQuery({
        queryKey: ['telemetry', 'alerts', deviceKey, { limit }],
        queryFn: async () => {
            const response = await telemetryApi.getAlertHistory(deviceKey, limit);
            return (response.data || []).map(mapAlert);
        },
        enabled: !!deviceKey,
    });
};
