import { useAuthStore } from './store';

export const useAuth = () => {
    const authStore = useAuthStore();
    return authStore;
};

export const useCurrentUser = () => {
    const { user } = useAuthStore();
    return user;
};
