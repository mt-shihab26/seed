import {
    Archive,
    ChartBar,
    KeyRound,
    Palette,
    ShieldCheck,
    Star,
    StickyNote,
    Trash2,
    UserCircle,
} from 'lucide-react';

import type { TLink } from '@/types/utils';

export const pagesLinks: TLink[] = [
    {
        title: 'Notes',
        route: 'notes.index',
        icon: StickyNote,
        shortcut: ['mod', 'shift', 'n'],
    },
    {
        title: 'Favorites',
        route: 'notes.favorites',
        icon: Star,
        shortcut: ['mod', 'shift', 'f'],
    },
    {
        title: 'Archived',
        route: 'notes.archived',
        icon: Archive,
        shortcut: ['mod', 'shift', 'r'],
    },
    {
        title: 'Trash',
        route: 'notes.trashed',
        icon: Trash2,
        shortcut: ['mod', 'shift', 'd'],
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
