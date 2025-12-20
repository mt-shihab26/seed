import type { TLink } from '@/types/utils';

import { Archive, Folder, Star, StickyNote, Trash2 } from 'lucide-react';

export const mainLinks: TLink[] = [
    {
        title: 'Notes',
        route: 'notes.index',
        icon: StickyNote,
    },
    {
        title: 'Favorites',
        route: 'notes.favorites',
        icon: Star,
    },
    {
        title: 'Archived',
        route: 'notes.archived',
        icon: Archive,
    },
    {
        title: 'Trash',
        route: 'notes.trashed',
        icon: Trash2,
    },
];

export const rightLinks: TLink[] = [
    {
        title: 'Repository',
        href: 'https://github.com/mt-shihab26/seed/tree/main/seed-laravel',
        icon: Folder,
    },
];
