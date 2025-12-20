export type TUser = {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    bio: string | null;
    location: string | null;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;

    folders?: TFolder[];
    tags?: TTag[];
};

export type TFolder = {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
    updated_at: string;
};

export type TNote = {
    id: string;
    user_id: string;
    folder_id: string;
    title: string;
    content: string;
    favorited_at: string | null;
    archived_at: string | null;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;

    folder?: TFolder;
    tags: TTag[];
};

export type TTag = {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
    updated_at: string;

    pivot?: { note_id: string; tag_id: string }[];
};
