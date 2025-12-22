import type { ReactNode } from 'react';

import { Menu } from './menu';

export const AppLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex flex-col items-center justify-center py-1">
                <Menu />
            </div>
            <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl">
                {children}
            </main>
        </div>
    );
};
