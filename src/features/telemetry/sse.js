import { getAccessToken } from '../../lib/auth/tokenStorage';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://ideographic-arie-hastily.ngrok-free.dev/api';

class SSEClient {
    constructor() {
        this.source = null;
        this.listeners = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectTimeout = null;
    }

    connect() {
        if (this.source) {
            this.disconnect();
        }

        const token = getAccessToken();
        if (!token) {
            console.warn('SSEClient: No token found. Cannot connect.');
            return;
        }

        const url = `${API_BASE_URL}/stream/events?token=${encodeURIComponent(token)}`;
        console.log('SSEClient: Connecting to', url);

        this.source = new EventSource(url);

        this.source.onopen = () => {
            console.log('SSEClient: Connected to stream');
            this.reconnectAttempts = 0;
            this.emit('connection', { state: 'connected' });
        };

        this.source.onerror = (error) => {
            console.error('SSEClient: Connection error.', error);
            this.source.close();
            this.emit('connection', { state: 'error', error });

            this.handleReconnect();
        };

        this.source.addEventListener('telemetry', (e) => {
            try {
                const data = JSON.parse(e.data);
                this.emit('telemetry', data);
            } catch (err) {
                console.error('SSEClient: Error parsing telemetry event', err);
            }
        });

        this.source.addEventListener('alert', (e) => {
            try {
                const data = JSON.parse(e.data);
                this.emit('alert', data);
            } catch (err) {
                console.error('SSEClient: Error parsing alert event', err);
            }
        });
    }

    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
            console.log(`SSEClient: Reconnecting in ${delay}ms (Attempt ${this.reconnectAttempts})`);
            this.emit('connection', { state: 'reconnecting', attempt: this.reconnectAttempts });

            this.reconnectTimeout = setTimeout(() => {
                this.connect();
            }, delay);
        } else {
            console.error('SSEClient: Max reconnect attempts reached.');
            this.emit('connection', { state: 'disconnected' });
        }
    }

    disconnect() {
        if (this.source) {
            this.source.close();
            this.source = null;
            console.log('SSEClient: Disconnected');
            this.emit('connection', { state: 'disconnected' });
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
    }

    subscribe(eventType, callback) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, new Set());
        }
        this.listeners.get(eventType).add(callback);

        return () => this.unsubscribe(eventType, callback);
    }

    unsubscribe(eventType, callback) {
        if (this.listeners.has(eventType)) {
            this.listeners.get(eventType).delete(callback);
        }
    }

    emit(eventType, data) {
        if (this.listeners.has(eventType)) {
            this.listeners.get(eventType).forEach(cb => cb(data));
        }
    }
}

// Singleton instance
export const sseClient = new SSEClient();
