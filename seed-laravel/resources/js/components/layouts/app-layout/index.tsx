import type { ReactNode } from 'react';

import { RootLayout } from '@/components/layouts/root-layout';
import { Menu } from './menu';

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RootLayout>
            <div className="flex h-screen w-full flex-col overflow-hidden pb-2">
                <div className="flex flex-col items-center justify-center py-1">
                    <Menu />
                </div>
                <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-4 overflow-hidden">
                    {children}
                </main>
            </div>
        </RootLayout>
    );
};
