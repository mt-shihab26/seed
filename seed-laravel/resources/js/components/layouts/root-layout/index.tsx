import type { ReactNode } from 'react';

import { useFlashMessages } from '@/hooks/use-flash-messages';

import { Toaster } from '@/components/ui/sonner';
import { KeyboardShortcutsProvider } from '@/providers/keyboard-shortcuts-provider';

export const RootLayout = ({ children }: { children: ReactNode }) => {
    useFlashMessages();

    return (
        <KeyboardShortcutsProvider>
            {children}
            <Toaster />
        </KeyboardShortcutsProvider>
    );
};
