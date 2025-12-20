export const formatInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');

    if (names.length === 0) return '';
    if (names.length === 1) return names[0].charAt(0).toUpperCase();

    const firstInitial = names[0].charAt(0);
    const lastInitial = names[names.length - 1].charAt(0);

    return `${firstInitial}${lastInitial}`.toUpperCase();
};

const isMac = () => {
    if (typeof window === 'undefined') return false;
    return navigator.platform.toUpperCase().indexOf('MAC') >= 0;
};

/**
 * Formats keyboard shortcuts based on the user's platform
 * @param shortcut - The shortcut in format like "mod+n" where mod = Cmd on Mac, Ctrl on Win/Linux
 */
export const formatShortcut = (shortcut: string): string => {
    const mac = isMac();

    return shortcut
        .split('+')
        .map((key) => {
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
        })
        .join(mac ? '' : '+');
};
