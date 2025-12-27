import {
    Archive,
    Folder,
    KeyRound,
    ListTodo,
    Palette,
    ShieldCheck,
    Star,
    StickyNote,
    Tag,
    Timer,
    Trash2,
    UserCircle,
} from 'lucide-react';

import type { TLink } from '@/types/utils';

export const toolsLinks: TLink[] = [
    {
        title: 'Notes',
        route: 'notes.index',
        icon: StickyNote,
        shortcut: ['n'],
    },
    {
        title: 'Todos',
        route: 'notes.favorites',
        icon: ListTodo,
        shortcut: ['t'],
    },
    {
        title: 'Timer',
        route: 'notes.archived',
        icon: Timer,
        shortcut: ['t'],
    },
];

export const collectionsLinks: TLink[] = [
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
