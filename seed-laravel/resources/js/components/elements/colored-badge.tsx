import type { ColorName } from '@/lib/colors';
import type { ReactNode } from 'react';

import { getColorClasses } from '@/lib/colors';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

export const ColoredBadge = ({
    type,
    color,
    children,
    className,
}: {
    type: 'folder' | 'tag';
    color: ColorName;
    children: ReactNode;
    className?: string;
}) => {
    const colorClasses = getColorClasses(color);

    return (
        <Badge
            variant={type === 'folder' ? 'outline' : 'secondary'}
            className={cn(colorClasses.bg, colorClasses.text, 'border-transparent', className)}
        >
            {children}
        </Badge>
    );
};
