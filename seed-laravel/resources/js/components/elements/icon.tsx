import type { LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

import { cn } from '@/lib/utils';

interface IconProps extends Omit<LucideProps, 'ref'> {
    node: ComponentType<LucideProps>;
}

export const Icon = ({ node: Node, className, ...props }: IconProps) => {
    return <Node className={cn('h-4 w-4', className)} {...props} />;
};
