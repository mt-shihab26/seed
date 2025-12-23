import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Link } from '@inertiajs/react';

interface TProps extends ComponentPropsWithoutRef<typeof Link> {
    icon: LucideIcon;
    active?: boolean;
    variant?: 'default' | 'destructive';
}

export const NoteActionLink = ({
    icon: Icon,
    active = false,
    variant = 'default',
    className,
    ...props
}: TProps) => {
    return (
        <Link
            className={cn(buttonVariants({ size: 'icon', variant: 'ghost' }), className)}
            {...props}
        >
            <Icon
                className={cn('size-4', {
                    'fill-primary text-primary': active && variant === 'default',
                    'fill-destructive text-destructive': active && variant === 'destructive',
                })}
            />
        </Link>
    );
};
