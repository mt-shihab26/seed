import type { TLink } from '@/types/utils';

import { BookOpen, Folder, LayoutGrid, StickyNote } from 'lucide-react';

export const mainLinks: TLink[] = [
    {
        title: 'Dashboard',
        route: 'dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Notes',
        route: 'notes.index',
        icon: StickyNote,
    },
];

export const rightLinks: TLink[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];
