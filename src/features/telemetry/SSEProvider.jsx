import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../auth/hooks';
import { sseClient } from './sse';
import { toast } from 'sonner';

const SSEContext = createContext(null);

export const SSEProvider = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const queryClient = useQueryClient();
    const [connectionState, setConnectionState] = useState('disconnected');

    useEffect(() => {
        if (isAuthenticated) {
            // Connect to SSE when authenticated
            sseClient.connect();

            const unsubConn = sseClient.subscribe('connection', (data) => {
                setConnectionState(data.state);
                if (data.state === 'error') {
                    // we don't spam toasts for reconnects, only maybe for fatal disconnected
                }
            });

            const unsubTele = sseClient.subscribe('telemetry', (data) => {
                const deviceKey = data.deviceKey;
                // Opt: Manually update query cache here instead of invalidating to save network
                queryClient.setQueryData(['telemetry', 'latest', deviceKey], (oldData) => {
                    return {
                        ...oldData,
                        ...data,
                        infant: data.infant || oldData?.infant,
                    };
                });

                // Also update history by pre-pending to history cache
                queryClient.setQueryData(['telemetry', 'history', deviceKey, { limit: 25 }], (oldHistory) => {
                    if (!oldHistory) return [{ ...data, infant: data.infant }];
                    return [{ ...data, infant: data.infant || oldHistory[0]?.infant }, ...oldHistory].slice(0, 25);
                });
            });


            const unsubAlert = sseClient.subscribe('alert', (data) => {
                const deviceKey = data.deviceKey;

                queryClient.invalidateQueries({ queryKey: ['telemetry', 'alerts', deviceKey] });
                queryClient.invalidateQueries({ queryKey: ['telemetry', 'latest', deviceKey] });

                // Show a UI toast notification for critical alerts
                if (data.severity === 'critical') {
                    toast.error(`CRITICAL ALERT: ${data.topic}`, {
                        description: data.reason,
                        duration: 10000,
                    });
                }
            });

            return () => {
                unsubConn();
                unsubTele();
                unsubAlert();
                sseClient.disconnect();
            };
        } else {
            sseClient.disconnect();
            setConnectionState('disconnected');
        }
    }, [isAuthenticated, queryClient]);

    return (
        <SSEContext.Provider value={{ connectionState, sseClient }}>
            {children}
        </SSEContext.Provider>
    );
};

export const useSSE = () => useContext(SSEContext);
