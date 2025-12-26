import type { TShared } from '@/types/props';

import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useFlashMessages = () => {
    const { props } = usePage<TShared>();

    useEffect(() => {
        if (props.flash.success) {
            toast.success(props.flash.success);
        }

        if (props.flash.error) {
            toast.error(props.flash.error);
        }

        if (props.flash.info) {
            toast.info(props.flash.info);
        }
    }, [props.flash.success, props.flash.error, props.flash.info]);
};
