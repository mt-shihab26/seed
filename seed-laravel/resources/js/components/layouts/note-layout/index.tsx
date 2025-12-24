import type { ReactNode } from 'react';

import { AppLayout } from '@/components/layouts/app-layout';
import { Head } from '@inertiajs/react';

export const NoteLayout = ({
    title,
    header,
    children,
}: {
    title: string;
    header: ReactNode;
    children: ReactNode;
}) => {
    return (
        <AppLayout>
            <Head title={title} />
            <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-6 overflow-hidden">
                {header}
                <div className="flex-1 space-y-6 overflow-y-auto pr-2.5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:bg-muted">
                    {children}
                </div>
            </main>
        </AppLayout>
    );
};
