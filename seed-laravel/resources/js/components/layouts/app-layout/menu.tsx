import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TShared } from '@/types/props';

import { APP_NAME } from '@/lib/env';
import { getHref, isActiveHref } from '@/lib/href';
import { pagesLinks } from '@/lib/links';
import { formatShortcut } from '@/lib/shortcut';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';

import { AppLogoIcon } from '@/components/icons/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { ChevronDownIcon } from 'lucide-react';
import { AccordionLinks } from './accordion-links';

export const Menu = () => {
    const { url, props } = usePage<TShared>();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="lg" className="h-14 rounded-full">
                    <div className="flex items-center space-x-1">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                            <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                        </div>
                        <div className="ml-1 grid flex-1 text-left text-sm">
                            <span className="mb-0.5 truncate text-lg leading-tight font-semibold">
                                {APP_NAME}
                            </span>
                        </div>
                        <ChevronDownIcon className="size-5" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="flex max-h-[calc(100vh-2.5rem)] min-w-full flex-col space-y-3 overflow-hidden rounded-4xl p-4 md:min-w-120"
                align="center"
                sideOffset={-44}
            >
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
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
