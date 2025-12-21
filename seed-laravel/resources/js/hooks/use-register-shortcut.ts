import { useKeyboardShortcuts } from '@/providers/keyboard-shortcuts-provider';
import { useEffect } from 'react';

/**
 * Hook to register a keyboard shortcut
 * @param id - Unique identifier for the shortcut
 * @param keys - Array of keys for the shortcut (e.g., ['mod', 'k'] or ['j'])
 * @param handler - Function to execute when shortcut is triggered
 * @param enabled - Whether the shortcut is enabled (default: true)
 */
export const useRegisterShortcut = (
    id: string,
    keys: string[],
    handler: () => void,
    enabled = true,
) => {
    const { registerShortcut, unregisterShortcut } = useKeyboardShortcuts();

    useEffect(() => {
        if (enabled) {
            registerShortcut(id, { keys, handler });
        }

        return () => {
            unregisterShortcut(id);
        };
    }, [id, keys, handler, enabled, registerShortcut, unregisterShortcut]);
};
