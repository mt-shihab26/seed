import type { TFolder, TNote, TTag } from '@/types/models';

export const getFoldersFromNotes = (notes: TNote[]): TFolder[] => {
    return Array.from(
        new Map(
            notes
                .map((note) => note.folder)
                .filter((folder): folder is TFolder => folder !== undefined)
                .map((folder) => [folder.id, folder]),
        ).values(),
    );
};

export const getTagsFromNotes = (notes: TNote[]): TTag[] => {
    return Array.from(
        new Map(notes.flatMap((note) => note.tags).map((tag) => [tag.id, tag])).values(),
    );
};
