import type { TUser } from './models';

export type TCounts = Record<string, number | null>;

export type TAuth = {
    user: TUser;
    counts: TCounts;
};

export type TFlash = {
    info: string | null;
    success: string | null;
    error: string | null;
};

export type TShared = {
    auth: TAuth;
    flash: TFlash;
};
