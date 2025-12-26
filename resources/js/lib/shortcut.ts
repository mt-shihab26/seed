/**
 * Detects whether the current platform is macOS.
 *
 * Safely returns false during server-side rendering.
 *
 * @returns `true` if running on macOS, otherwise `false`
 */
const isMac = (): boolean => {
    if (typeof window === 'undefined') return false;
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};

/**
 * Formats a keyboard key label based on the user's platform.
 *
 * Converts logical keys (e.g. "mod") into platform-specific
 * symbols or names (⌘ on macOS, Ctrl on Windows/Linux).
 *
 * @param key - The key to format (e.g. "mod", "shift", "a")
 * @returns A human-readable, platform-specific key label
 */
export const formatKey = (key: string): string => {
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
 * Determines whether the given element should be treated
 * as an input-like element.
 *
 * This is useful for disabling global keyboard shortcuts
 * while the user is typing in form fields or editable content.
 *
 * @param element - The element to check
 * @returns `true` if the element is an input, textarea, select,
 *          or content-editable element
 */
export const isInputElement = (element: HTMLElement | null): boolean => {
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

/**
 * Checks whether a keyboard event matches a given shortcut definition.
 *
 * Supports platform-aware "mod" keys (Cmd on macOS, Ctrl elsewhere)
 * and requires an exact match for modifier keys.
 *
 * Example:
 *   keys = ["mod", "shift", "k"]
 *
 * @param event - The keyboard event triggered by the user
 * @param keys - The shortcut definition (modifier keys + main key)
 * @returns `true` if the event matches the shortcut exactly
 */
export const matchesShortcut = (event: KeyboardEvent, keys: string[]): boolean => {
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
