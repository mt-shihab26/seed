import type { TUser } from './models';

export type TShared = {
    auth: {
        user: TUser;
    };
    flash: {
        info: string | null;
        success: string | null;
        error: string | null;
    };
};
