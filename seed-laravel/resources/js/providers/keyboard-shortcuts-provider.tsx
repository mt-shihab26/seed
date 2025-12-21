import type { TLink } from '@/types/utils';
import type { ReactNode } from 'react';

import { getHref } from '@/lib/href';
import { router } from '@inertiajs/react';
import { createContext, useContext, useEffect, useRef } from 'react';

type TConfig = {
    keys: string[];
    handler: () => void;
    description?: string;
};

type TContext = {
    registerShortcut: (id: string, config: TConfig) => void;
    unregisterShortcut: (id: string) => void;
    registerLinks: (links: TLink[]) => void;
};

const KeyboardShortcutsContext = createContext<TContext | null>(null);

export const useKeyboardShortcuts = () => {
    const context = useContext(KeyboardShortcutsContext);
    if (!context) {
        throw new Error('useKeyboardShortcuts must be used within KeyboardShortcutsProvider');
    }
    return context;
};

export const KeyboardShortcutsProvider = ({ children }: { children: ReactNode }) => {
    const shortcutsRef = useRef<Map<string, TConfig>>(new Map());

    const registerShortcut = (id: string, config: TConfig) => {
        shortcutsRef.current.set(id, config);
    };

    const unregisterShortcut = (id: string) => {
        shortcutsRef.current.delete(id);
    };

    const registerLinks = (links: TLink[]) => {
        links.forEach((link) => {
            if (link.shortcut) {
                const id = `link-${getHref(link)}`;
                registerShortcut(id, {
                    keys: link.shortcut,
                    handler: () => router.visit(getHref(link)),
                    description: link.title,
                });
            }
        });
    };

    const matchesShortcut = (event: KeyboardEvent, keys: string[]): boolean => {
        const normalizedKeys = keys.map((k) => k.toLowerCase());

        // Check for modifier keys
        const hasMod = normalizedKeys.includes('mod');
        const hasShift = normalizedKeys.includes('shift');
        const hasAlt = normalizedKeys.includes('alt');
        const hasCtrl = normalizedKeys.includes('ctrl');

        // Get the actual key (non-modifier)
        const actualKey = normalizedKeys.find((k) => !['mod', 'shift', 'alt', 'ctrl'].includes(k));

        if (!actualKey) return false;

        // Check if the pressed key matches
        const keyMatches = event.key.toLowerCase() === actualKey;

        // Check modifiers
        const modMatches = hasMod ? event.metaKey || event.ctrlKey : true;
        const shiftMatches = hasShift ? event.shiftKey : !event.shiftKey;
        const altMatches = hasAlt ? event.altKey : !event.altKey;
        const ctrlMatches = hasCtrl ? event.ctrlKey : !event.ctrlKey;

        // For 'mod' shortcuts, ensure we don't require extra modifiers
        if (hasMod) {
            return (
                keyMatches &&
                (event.metaKey || event.ctrlKey) &&
                shiftMatches &&
                altMatches &&
                (!hasCtrl || ctrlMatches)
            );
        }

        return keyMatches && modMatches && shiftMatches && altMatches && ctrlMatches;
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Don't trigger shortcuts when typing in input fields
            const target = event.target as HTMLElement;
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.isContentEditable
            ) {
                return;
            }

            // Check all registered shortcuts
            shortcutsRef.current.forEach((config) => {
                if (matchesShortcut(event, config.keys)) {
                    event.preventDefault();
                    config.handler();
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <KeyboardShortcutsContext.Provider
            value={{ registerShortcut, unregisterShortcut, registerLinks }}
        >
            {children}
        </KeyboardShortcutsContext.Provider>
    );
};
