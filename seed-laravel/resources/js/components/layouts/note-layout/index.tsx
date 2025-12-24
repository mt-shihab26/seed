import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { AppLayout } from '@/components/layouts/app-layout';
import { Head } from '@inertiajs/react';

export const NoteLayout = ({
    title,
    header,
    children,
    className,
}: {
    title: string;
    header: ReactNode;
    children: ReactNode;
    className: string;
}) => {
    return (
        <AppLayout>
            <Head title={title} />
            <main
                className={cn(
                    'mx-auto flex w-full flex-1 flex-col space-y-6 overflow-hidden',
                    className,
                )}
            >
                {header}
                <div className="flex-1 space-y-6 overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-muted">
                    {children}
                </div>
            </main>
        </AppLayout>
    );
};
