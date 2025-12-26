import type { ReactNode } from 'react';

import { useFlashMessages } from '@/hooks/use-flash-messages';

import { Toaster } from '@/components/ui/sonner';
import { ShortcutsProvider } from '@/providers/shortcuts';

export const RootLayout = ({ children }: { children: ReactNode }) => {
    useFlashMessages();

    return (
        <ShortcutsProvider>
            {children}
            <Toaster position="top-right" />
        </ShortcutsProvider>
    );
};
