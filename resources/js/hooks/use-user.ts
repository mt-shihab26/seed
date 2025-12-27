import type { TShared } from '@/types/props';

import { usePage } from '@inertiajs/react';

export const useUser = () => {
    const { user } = usePage<TShared>().props.auth;

    return { user };
};
