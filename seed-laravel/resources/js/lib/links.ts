import {
    Archive,
    ChartBar,
    Folder,
    KeyRound,
    Palette,
    ShieldCheck,
    Star,
    StickyNote,
    Trash2,
    UserCircle,
} from 'lucide-react';

import type { TLink } from '@/types/utils';

export const rightLinks: TLink[] = [
    {
        title: 'Repository',
        href: 'https://github.com/mt-shihab26/seed/tree/main/seed-laravel',
        icon: Folder,
    },
];

export const pagesLinks: TLink[] = [
    {
        title: 'Notes',
        route: 'notes.index',
        icon: StickyNote,
        shortcut: 'mod+1',
    },
    {
        title: 'Favorites',
        route: 'notes.favorites',
        icon: Star,
        shortcut: 'mod+2',
    },
    {
        title: 'Archived',
        route: 'notes.archived',
        icon: Archive,
        shortcut: 'mod+3',
    },
    {
        title: 'Trash',
        route: 'notes.trashed',
        icon: Trash2,
        shortcut: 'mod+4',
    },
];

export const settingsLinks: TLink[] = [
    {
        title: 'Statistics',
        route: 'settings.statistics.edit',
        icon: ChartBar,
        shortcut: 'mod+shift+s',
    },
    {
        title: 'Profile',
        route: 'settings.profile.edit',
        icon: UserCircle,
        shortcut: 'mod+,',
    },
    {
        title: 'Password',
        route: 'settings.password.edit',
        icon: KeyRound,
        shortcut: 'mod+shift+k',
    },
    {
        title: 'Two-Factor Auth',
        route: 'settings.two-factor.show',
        icon: ShieldCheck,
        shortcut: 'mod+shift+2',
    },
    {
        title: 'Appearance',
        route: 'settings.appearance.edit',
        icon: Palette,
        shortcut: 'mod+shift+t',
    },
];
