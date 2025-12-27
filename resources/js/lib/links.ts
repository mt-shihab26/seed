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
        route: 'todos.index',
        icon: ListTodo,
        shortcut: ['o'],
    },
    {
        title: 'Timer',
        route: 'notes.archived',
        icon: Timer,
        shortcut: ['m'],
    },
];

export const collectionsLinks: TLink[] = [
    {
        title: 'Favorites',
        route: 'favorites.index',
        icon: Star,
        shortcut: ['f'],
    },
    {
        title: 'Archived',
        route: 'archives.index',
        icon: Archive,
        shortcut: ['a'],
    },
    {
        title: 'Trash',
        route: 'trashs.index',
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
