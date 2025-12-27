import type { ReactNode } from 'react';

import { RootLayout } from '@/components/layouts/root-layout';
import { Menu } from './menu';

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <RootLayout>
            <div className="flex h-full w-full flex-col pb-4">
                <div className="flex flex-col items-center justify-center py-1">
                    <Menu />
                </div>
                <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col">{children}</main>
            </div>
        </RootLayout>
    );
};
