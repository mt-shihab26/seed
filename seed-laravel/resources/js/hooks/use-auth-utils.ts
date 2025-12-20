import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { router } from '@inertiajs/react';

export const useAuthUtils = () => {
    const { cleanup } = useMobileNavigation();

    const logout = () => {
        router.post('logout');
        cleanup();
        router.flushAll();
    };

    return {
        logout,
    };
};
