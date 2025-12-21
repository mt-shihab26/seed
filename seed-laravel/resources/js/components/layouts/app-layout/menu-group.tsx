import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

import type { TShared } from '@/types/props';
import type { TLink } from '@/types/utils';

import { getHref, isActiveHref } from '@/lib/href';
import { formatShortcut } from '@/lib/shortcut';
import { router, usePage } from '@inertiajs/react';

import { Icon } from '@/components/ui/icon';

export const MenuGroup = ({ links }: { links: TLink[] }) => {
    const { url } = usePage<TShared>();

    return (
        <DropdownMenuGroup>
            {links.map((link) => (
                <DropdownMenuItem
                    key={getHref(link)}
                    onClick={() => router.visit(getHref(link))}
                    data-active={isActiveHref(url, link)}
                    className={isActiveHref(url, link) ? 'bg-accent text-accent-foreground' : ''}
                >
                    {link.icon && <Icon iconNode={link.icon} className="size-4" />}
                    {link.title}
                    {link.shortcut && (
                        <DropdownMenuShortcut>{formatShortcut(link.shortcut)}</DropdownMenuShortcut>
                    )}
                </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
    );
};
