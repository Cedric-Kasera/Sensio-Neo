import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { devicesApi } from './api';
import { mapDevice, mapAssignment } from './mappers';
import { toast } from 'sonner';

export const useDevices = () => {
    return useQuery({
        queryKey: ['devices'],
        queryFn: async () => {
            const response = await devicesApi.getDevices();
            return (response.data || []).map(mapDevice);
        },
    });
};

export const useDevice = (deviceKey) => {
    return useQuery({
        queryKey: ['devices', deviceKey],
        queryFn: async () => {
            const response = await devicesApi.getDevice(deviceKey);
            return mapDevice(response.data);
        },
        enabled: !!deviceKey,
    });
};

export const useAssignment = (deviceKey) => {
    return useQuery({
        queryKey: ['assignment', deviceKey],
        queryFn: async () => {
            const response = await devicesApi.getAssignment(deviceKey);
            return mapAssignment(response.data);
        },
        enabled: !!deviceKey,
        retry: false, // Don't retry if 404
    });
};

export const useAssignmentHistory = (deviceKey, limit = 25) => {
    return useQuery({
        queryKey: ['assignments', deviceKey, { limit }],
        queryFn: async () => {
            const response = await devicesApi.getAssignmentHistory(deviceKey, limit);
            return (response.data || []).map(mapAssignment);
        },
        enabled: !!deviceKey,
    });
};

export const useAssignDevice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ deviceKey, data }) => {
            return devicesApi.assignDevice(deviceKey, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['assignment', variables.deviceKey] });
            queryClient.invalidateQueries({ queryKey: ['assignments', variables.deviceKey] });
            queryClient.invalidateQueries({ queryKey: ['devices'] });
            toast.success('Device assigned successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error?.message || 'Failed to assign device');
        },
    });
};

export const useUnassignDevice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ deviceKey, data }) => {
            return devicesApi.unassignDevice(deviceKey, data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['assignment', variables.deviceKey] });
            queryClient.invalidateQueries({ queryKey: ['assignments', variables.deviceKey] });
            queryClient.invalidateQueries({ queryKey: ['devices'] });
            toast.success('Device unassigned');
        },
        onError: (error) => {
            toast.error(error.response?.data?.error?.message || 'Failed to unassign device');
        },
    });
};

export const useGenerateCredentials = () => {
    return useMutation({
        mutationFn: async ({ deviceKey, clientId }) => {
            const response = await devicesApi.generateCredentials(deviceKey, clientId);
            return response.data;
        },
        onError: (error) => {
            toast.error(error.response?.data?.error?.message || 'Failed to generate credentials');
        },
    });
};
