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

        // Check for modifier keys in shortcut definition
        const hasMod = normalizedKeys.includes('mod');
        const hasShift = normalizedKeys.includes('shift');
        const hasAlt = normalizedKeys.includes('alt');
        const hasCtrl = normalizedKeys.includes('ctrl');

        // Get the actual key (non-modifier)
        const actualKey = normalizedKeys.find((k) => !['mod', 'shift', 'alt', 'ctrl'].includes(k));

        if (!actualKey) return false;

        // Check if the pressed key matches
        const keyMatches = event.key.toLowerCase() === actualKey;
        if (!keyMatches) return false;

        // For shortcuts with 'mod', check if Cmd (Mac) or Ctrl is pressed
        if (hasMod) {
            if (!(event.metaKey || event.ctrlKey)) return false;
        } else {
            // If shortcut doesn't have 'mod', neither Cmd nor Ctrl should be pressed
            if (event.metaKey || event.ctrlKey) return false;
        }

        // Check other modifiers - they must match exactly
        if (hasShift !== event.shiftKey) return false;
        if (hasAlt !== event.altKey) return false;
        if (hasCtrl && !event.ctrlKey) return false;

        return true;
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Check both event.target and document.activeElement for input detection
            const target = event.target as HTMLElement;
            const activeElement = document.activeElement as HTMLElement;

            // Helper function to check if an element is an input-like element
            const isInputElement = (element: HTMLElement | null): boolean => {
                if (!element) return false;

                return (
                    element.tagName === 'INPUT' ||
                    element.tagName === 'TEXTAREA' ||
                    element.tagName === 'SELECT' ||
                    element.isContentEditable ||
                    element.getAttribute('contenteditable') === 'true' ||
                    element.getAttribute('role') === 'textbox' ||
                    element.closest('[contenteditable="true"]') !== null
                );
            };

            // Don't trigger shortcuts when typing in input fields
            const isTargetInput = isInputElement(target);
            const isActiveInput = isInputElement(activeElement);

            if (isTargetInput || isActiveInput) {
                console.log('🚫 Shortcut blocked - typing in input:', {
                    key: event.key,
                    targetTag: target?.tagName,
                    activeTag: activeElement?.tagName,
                    isTargetInput,
                    isActiveInput,
                });
                // Stop propagation to prevent other listeners from firing
                event.stopImmediatePropagation();
                return;
            }

            // Check all registered shortcuts
            let handled = false;
            shortcutsRef.current.forEach((config) => {
                if (!handled && matchesShortcut(event, config.keys)) {
                    console.log('✅ Shortcut triggered:', config.keys.join('+'));
                    event.preventDefault();
                    event.stopImmediatePropagation();
                    config.handler();
                    handled = true;
                }
            });
        };

        // Use capture phase to ensure we catch the event first
        window.addEventListener('keydown', handleKeyDown, true);
        return () => window.removeEventListener('keydown', handleKeyDown, true);
    }, []);

    return (
        <KeyboardShortcutsContext.Provider
            value={{ registerShortcut, unregisterShortcut, registerLinks }}
        >
            {children}
        </KeyboardShortcutsContext.Provider>
    );
};
