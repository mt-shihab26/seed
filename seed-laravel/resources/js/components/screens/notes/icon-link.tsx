import type { LucideIcon } from 'lucide-react';
import type { ComponentPropsWithoutRef } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Link } from '@inertiajs/react';

interface IconLinkProps extends ComponentPropsWithoutRef<typeof Link> {
    icon: LucideIcon;
    variant?: 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary' | 'link';
}

export const IconLink = ({
    icon: Icon,
    variant = 'default',
    className,
    ...props
}: IconLinkProps) => {
    return (
        <Link
            className={cn(buttonVariants({ variant, size: 'icon' }), 'rounded-full', className)}
            {...props}
        >
            <Icon className="size-5" />
        </Link>
    );
};
