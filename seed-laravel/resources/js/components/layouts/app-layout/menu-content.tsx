import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

import type { TShared } from '@/types/props';

import { getHref, isActiveHref } from '@/lib/href';
import { pagesLinks } from '@/lib/links';
import { formatShortcut } from '@/lib/shortcut';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';

import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { AccordionLinks } from './accordion-links';

export const MenuContent = () => {
    const { url, props } = usePage<TShared>();

    return (
        <>
            <div className="text-center text-xl font-bold">
                <h2>{props.auth.user.name}'s Notes</h2>
            </div>
            <div className="px-2">
                <Input
                    placeholder="Type to jump to folders, tags, quick links..."
                    autoFocus={true}
                    className="focus-visible:ring-primary"
                />
            </div>
            <DropdownMenuSeparator />

            <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted">
                <DropdownMenuGroup>
                    {pagesLinks.map((link) => (
                        <DropdownMenuItem
                            key={link.route || link.href}
                            onClick={() => router.visit(getHref(link))}
                            data-active={isActiveHref(url, link)}
                            className={cn(
                                isActiveHref(url, link) && 'bg-accent text-accent-foreground',
                            )}
                        >
                            <Icon iconNode={link.icon} />
                            {link.title}
                            {link.shortcut && (
                                <DropdownMenuShortcut>
                                    {formatShortcut(link.shortcut)}
                                </DropdownMenuShortcut>
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <AccordionLinks />
            </div>
        </>
    );
};
