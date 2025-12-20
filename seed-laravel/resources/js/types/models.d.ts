export interface TNote {
    id: string;
    title: string;
    content: string;
    tags: string[];
    folder: string;
    favorited: boolean;
    archived: boolean;
    trashed: boolean;
    created_at: string;
    updated_at: string;
}
