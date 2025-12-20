import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import type { TUser } from '@/types/models';

import { useAuthUtils } from '@/hooks/use-auth-utils';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

import { Link } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';

import { UserInfo } from './user-info';

export const UserMenuContent = ({ user }: { user: TUser }) => {
    const { cleanup } = useMobileNavigation();
    const { logout } = useAuthUtils();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo user={user} showEmail={true} />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href={route('settings.redirect')}
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    as="button"
                    onClick={logout}
                    data-test="logout-button"
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
};
