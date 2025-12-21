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

import type { TAccordionLink, TLink } from '@/types/utils';

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
        shortcut: 'mod+n',
    },
    {
        title: 'Favorites',
        route: 'notes.favorites',
        icon: Star,
        shortcut: 'mod+f',
    },
    {
        title: 'Archived',
        route: 'notes.archived',
        icon: Archive,
        shortcut: 'mod+a',
    },
    {
        title: 'Trash',
        route: 'notes.trashed',
        icon: Trash2,
        shortcut: 'mod+d',
    },
];

export const settingsLinks: TLink[] = [
    {
        title: 'Statistics',
        route: 'settings.statistics.edit',
        icon: ChartBar,
    },
    {
        title: 'Profile',
        route: 'settings.profile.edit',
        icon: UserCircle,
    },
    {
        title: 'Password',
        route: 'settings.password.edit',
        icon: KeyRound,
    },
    {
        title: 'Two-Factor Auth',
        route: 'settings.two-factor.show',
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        route: 'settings.appearance.edit',
        icon: Palette,
    },
];

export const accordionLinks: TAccordionLink[] = [
    {
        key: 'settings',
        title: 'Settings',
        links: settingsLinks,
    },
];
