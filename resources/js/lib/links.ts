import {
    Archive,
    ChartBar,
    Folder,
    KeyRound,
    Palette,
    ShieldCheck,
    Star,
    StickyNote,
    Tag,
    Trash2,
    UserCircle,
} from 'lucide-react';

import type { TLink } from '@/types/utils';

export const pagesLinks = [
    {
        title: 'Notes',
        route: 'notes.index',
        icon: StickyNote,
        shortcut: ['n'],
    },
    {
        title: 'Favorites',
        route: 'notes.favorites',
        icon: Star,
        shortcut: ['f'],
    },
    {
        title: 'Archived',
        route: 'notes.archived',
        icon: Archive,
        shortcut: ['a'],
    },
    {
        title: 'Trash',
        route: 'notes.trashed',
        icon: Trash2,
        shortcut: ['t'],
    },
];

export const settingsLinks: TLink[] = [
    {
        title: 'Notes',
        route: 'settings.notes.show',
        icon: ChartBar,
    },
    {
        title: 'Folders',
        route: 'settings.folders.show',
        icon: Folder,
    },
    {
        title: 'Tags',
        route: 'settings.tags.show',
        icon: Tag,
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
        title: 'Two-Factor',
        route: 'settings.two-factor.show',
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        route: 'settings.appearance.edit',
        icon: Palette,
    },
];
