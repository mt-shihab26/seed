import { create } from 'zustand';

export const useNotesStore = create<{
    selectedFolderID: string | null;
    setSelectedFolderID: (folderId: string | null) => void;
    selectedTagIDs: string[] | null;
    setSelectedTagIDs: (tagIds: string[] | null) => void;
    searchQuery: string | null;
    selectedNoteID: string | null;
    toggleFolder: (folderId: string) => void;
    toggleTag: (tagId: string) => void;
    clearFilters: () => void;
}>((set) => ({
    selectedFolderID: null,
    setSelectedFolderID: (folderId) => set({ selectedFolderID: folderId }),
    selectedTagIDs: null,
    setSelectedTagIDs: (tagIds) => set({ selectedTagIDs: tagIds }),
    searchQuery: null,
    selectedNoteID: null,
    toggleFolder: (folderId) =>
        set((state) => ({
            selectedFolderID: state.selectedFolderID === folderId ? null : folderId,
        })),
    toggleTag: (tagId) =>
        set((state) => ({
            selectedTagIDs: state.selectedTagIDs?.includes(tagId)
                ? state.selectedTagIDs.filter((id) => id !== tagId)
                : [...(state.selectedTagIDs || []), tagId],
        })),
    clearFilters: () => set({ selectedFolderID: null, selectedTagIDs: null }),
}));
