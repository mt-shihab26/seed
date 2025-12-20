import type { TBreadcrumb } from '@/types/utils';
import type { ReactNode } from 'react';

import { Header } from './header';
import { Menu } from './menu';

export const AppLayout = ({
    children,
    breadcrumbs,
}: {
    children: ReactNode;
    breadcrumbs?: TBreadcrumb[];
}) => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header breadcrumbs={breadcrumbs} />
            <div className="flex flex-col items-center justify-center">
                <Menu />
            </div>
            <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl">
                {children}
            </main>
        </div>
    );
};
