const isMac = () => {
    if (typeof window === 'undefined') return false;
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};

/**
 * Formats a single key based on the user's platform
 * @param key - The key to format (e.g., "mod", "shift", "a")
 */
const formatKey = (key: string): string => {
    const mac = isMac();

    switch (key.toLowerCase()) {
        case 'mod':
            return mac ? '⌘' : 'Ctrl';
        case 'shift':
            return mac ? '⇧' : 'Shift';
        case 'alt':
            return mac ? '⌥' : 'Alt';
        case 'ctrl':
            return mac ? '⌃' : 'Ctrl';
        default:
            return key.toUpperCase();
    }
};

/**
 * Formats keyboard shortcuts based on the user's platform
 * @param shortcut - Array of keys like ["mod", "shift", "s"]
 */
export const formatShortcut = (shortcut: string[]): string => {
    const mac = isMac();
    return shortcut.map(formatKey).join(mac ? '' : '+');
};
