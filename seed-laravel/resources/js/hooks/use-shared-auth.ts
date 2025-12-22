import type { TShared } from '@/types/props';

import { usePage } from '@inertiajs/react';

import { Folder, Tag } from 'lucide-react';

export const useFoldersLinks = () => {
    const { props } = usePage<TShared>();

    const foldersLinks =
        props.auth.user.folders?.map((folder, index) => ({
            title: `${folder.name} (${folder.notes_count || 0})`,
            href: route('folders.show', { folder }),
            icon: Folder,
            shortcut: [`${index + 1}`],
        })) || [];

    return {
        foldersLinks,
    };
};

export const useTagsLinks = () => {
    const { props } = usePage<TShared>();

    const tagsLinks =
        props.auth.user.tags?.map((tag) => ({
            title: `${tag.name} (${tag.notes_count || 0})`,
            href: route('tags.show', { tag }),
            icon: Tag,
        })) || [];

    return {
        tagsLinks,
    };
};
