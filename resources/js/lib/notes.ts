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

export const getFilteredNotes = (
    notes: TNote[],
    options: {
        selectedFolderID: string | null;
        selectedTagIDs: string[] | null;
    },
): TNote[] => {
    let filtered = notes;

    if (options.selectedFolderID !== null) {
        filtered = filtered.filter((note) => note.folder_id === options.selectedFolderID);
    }

    if (options.selectedTagIDs !== null && options.selectedTagIDs.length > 0) {
        filtered = filtered.filter((note) =>
            note.tags.some((tag) => options.selectedTagIDs!.includes(tag.id)),
        );
    }

    return filtered;
};

export const getSelectedNote = (
    notes: TNote[],
    options: {
        selectedNoteID: string | null;
    },
): TNote | null => {
    return notes.find((n) => n.id === options.selectedNoteID) || null;
};
