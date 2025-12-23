import type { TLink } from '@/types/utils';
import type { ReactNode } from 'react';

import { getHref } from '@/lib/href';
import { isInputElement, matchesShortcut } from '@/lib/shortcut';
import { router } from '@inertiajs/react';
import { createContext, useContext, useEffect, useRef } from 'react';

type TConfig = {
    keys: string[];
    handler: () => void;
    description?: string;
};

const ShortcutsContext = createContext<{
    registerShortcut: (id: string, config: TConfig) => void;
    unregisterShortcut: (id: string) => void;
    registerLinks: (links: TLink[]) => void;
} | null>(null);

export const ShortcutsProvider = ({ children }: { children: ReactNode }) => {
    const shortcutsRef = useRef<Map<string, TConfig>>(new Map());

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement;
            const activeElement = document.activeElement as HTMLElement;

            if (
                (isInputElement(target) || isInputElement(activeElement)) &&
                event.key !== 'Escape'
            ) {
                event.stopImmediatePropagation();
                return;
            }

            let handled = false;

            shortcutsRef.current.forEach((config) => {
                if (!handled && matchesShortcut(event, config.keys)) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    config.handler();
                    handled = true;
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown, true);
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, []);

    return (
        <ShortcutsContext.Provider
            value={{
                registerShortcut: shortcutsRef.current.set,
                unregisterShortcut: shortcutsRef.current.delete,
                registerLinks: (links) => {
                    links.forEach((link) => {
                        if (!link.shortcut) return;
                        shortcutsRef.current.set(`link-${getHref(link)}`, {
                            keys: link.shortcut,
                            handler: () => router.visit(getHref(link)),
                            description: link.title,
                        });
                    });
                },
            }}
        >
            {children}
        </ShortcutsContext.Provider>
    );
};

export const useShortcuts = () => {
    const context = useContext(ShortcutsContext);
    if (!context) {
        throw new Error('useShortcuts must be used within KeyboardShortcutsProvider');
    }
    return context;
};
