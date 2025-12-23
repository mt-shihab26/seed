import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { TShared } from '@/types/props';

import { useFoldersLinks, useTagsLinks } from '@/hooks/use-shared-auth';
import { APP_NAME } from '@/lib/env';
import { pagesLinks, settingsLinks } from '@/lib/links';
import { useKeyboardShortcuts } from '@/providers/keyboard-shortcuts-provider';
import { useApplicationStore } from '@/stores/use-application-store';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import { Icon } from '@/components/elements/icon';
import { AppLogoIcon } from '@/components/icons/app-logo-icon';
import { AccordionTrigger } from '@/components/patch/accordion';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DropdownMenuGroup, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { ChevronDownIcon, Folders, Settings, Tags } from 'lucide-react';
import { MenuGroup } from './menu-group';

export const Menu = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    const { props } = usePage<TShared>();
    const { openAccordionItems, setOpenAccordionItems } = useApplicationStore();
    const { foldersLinks } = useFoldersLinks();
    const { tagsLinks } = useTagsLinks();
    const { registerShortcut, registerLinks } = useKeyboardShortcuts();

    const menuKey = 'j';

    useEffect(() => {
        registerShortcut('menu-toggle', {
            keys: [menuKey],
            handler: () => setOpen((prev) => !prev),
        });
        registerLinks(pagesLinks);
        registerLinks(foldersLinks);
    }, [registerLinks, registerShortcut, foldersLinks]);

    useEffect(() => {
        if (!open) {
            // Reset search when menu closes to clear filters
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearch('');
        }
    }, [open]);

    const links = [
        {
            key: 'folders',
            title: 'Folders',
            icon: Folders,
            links: foldersLinks,
        },
        {
            key: 'tags',
            title: 'Tags',
            icon: Tags,
            links: tagsLinks,
        },

        {
            key: 'settings',
            title: 'Settings',
            icon: Settings,
            links: settingsLinks,
        },
    ];

    const filterLinks = (links: typeof pagesLinks) => {
        if (!search) return links;
        return links.filter((link) => link.title.toLowerCase().includes(search.toLowerCase()));
    };

    const filteredPagesLinks = filterLinks(pagesLinks);
    const filteredAccordionLinks = links
        .map((accordionLink) => ({
            ...accordionLink,
            links: filterLinks(accordionLink.links),
        }))
        .filter((accordionLink) => accordionLink.links.length > 0);

    const hasResults =
        filteredPagesLinks.length > 0 || filteredAccordionLinks.some((l) => l.links.length > 0);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="lg" className="h-14 rounded-full">
                    <div className="flex items-center space-x-2">
                        <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                            <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
                        </div>
                        <div className="ml-1 grid flex-1 text-left text-sm">
                            <span className="mb-0.5 truncate text-lg leading-tight font-semibold">
                                {APP_NAME}
                            </span>
                        </div>
                        <KbdGroup>
                            <Kbd className="border border-border uppercase">{menuKey}</Kbd>
                        </KbdGroup>
                        <ChevronDownIcon className="size-5" />
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="relative flex max-h-[calc(100vh-2.5rem)] min-w-full flex-col space-y-3 overflow-hidden rounded-4xl p-4 md:min-w-120"
                align="center"
                sideOffset={-44}
            >
                <KbdGroup
                    onClick={() => setOpen(false)}
                    className="absolute top-4 left-3 cursor-pointer"
                >
                    <Kbd className="border border-border">ESC</Kbd>
                </KbdGroup>
                <div className="text-center text-xl font-bold">
                    <h2>{props.auth.user.name}'s Notes</h2>
                </div>
                <div className="px-2">
                    <Input
                        placeholder="Type to jump to folders, tags, quick links..."
                        autoFocus={true}
                        className="focus-visible:ring-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <DropdownMenuSeparator />
                <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted">
                    {!hasResults ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <p className="text-sm text-muted-foreground">No results found</p>
                        </div>
                    ) : (
                        <>
                            {filteredPagesLinks.length > 0 && (
                                <>
                                    <MenuGroup links={filteredPagesLinks} />
                                    <DropdownMenuSeparator />
                                </>
                            )}
                            <Accordion
                                type="multiple"
                                value={
                                    search
                                        ? filteredAccordionLinks.map((link) => link.key)
                                        : openAccordionItems
                                }
                                onValueChange={setOpenAccordionItems}
                            >
                                {filteredAccordionLinks.map((accordionLink) => (
                                    <AccordionItem
                                        key={accordionLink.key}
                                        value={accordionLink.key}
                                    >
                                        <AccordionTrigger>
                                            {accordionLink.icon && (
                                                <Icon
                                                    node={accordionLink.icon}
                                                    className="size-4"
                                                />
                                            )}
                                            {accordionLink.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="pl-5">
                                            <DropdownMenuGroup>
                                                <MenuGroup links={accordionLink.links} />
                                            </DropdownMenuGroup>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
