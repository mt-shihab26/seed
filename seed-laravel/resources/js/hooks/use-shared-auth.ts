import type { TShared } from '@/types/props';

import { usePage } from '@inertiajs/react';

import { Folder, Tag } from 'lucide-react';

export const useFoldersLinks = () => {
    const { props } = usePage<TShared>();

    const foldersLinks =
        props.auth.user.folders?.map((folder, index) => ({
            title: folder.name,
            href: route('notes.folders.show', { folder }),
            icon: Folder,
            shortcut: ['mod', 'shift', `${index + 1}`],
        })) || [];

    return {
        foldersLinks,
    };
};

export const useTagsLinks = () => {
    const { props } = usePage<TShared>();

    const tagsLinks =
        props.auth.user.tags?.map((tag, index) => ({
            title: tag.name,
            href: route('notes.tags.show', { tag }),
            icon: Tag,
            shortcut: ['mod', 'alt', `${index + 1}`],
        })) || [];

    return {
        tagsLinks,
    };
};
