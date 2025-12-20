export type TUser = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
};

export type TNote = {
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
};
