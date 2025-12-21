import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

import type { TShared } from '@/types/props';

import { getHref, isActiveHref } from '@/lib/href';
import { settingsLinks } from '@/lib/links';
import { formatShortcut } from '@/lib/shortcut';
import { useApplicationStore } from '@/stores/use-application-store';
import { router, usePage } from '@inertiajs/react';

import { AccordionTrigger } from '@/components/patch/accordion';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Icon } from '@/components/ui/icon';
import { Folder, Folders, Settings, Tag, Tags } from 'lucide-react';

export const AccordionLinks = () => {
    const { url, props } = usePage<TShared>();
    const { openAccordionItems, setOpenAccordionItems } = useApplicationStore();

    const links = [
        {
            key: 'folders',
            title: 'Folders',
            icon: Folders,
            links:
                props.auth.user.folders?.map((folder, index) => ({
                    title: folder.name,
                    href: route('notes.folders.show', { folder }),
                    icon: Folder,
                    shortcut: ['mod', 'shift', `${index + 1}`],
                })) || [],
        },
        {
            key: 'tags',
            title: 'Tags',
            icon: Tags,
            links:
                props.auth.user.tags?.map((tag, index) => ({
                    title: tag.name,
                    href: route('notes.tags.show', { tag }),
                    icon: Tag,
                    shortcut: ['mod', 'alt', `${index + 1}`],
                })) || [],
        },

        {
            key: 'settings',
            title: 'Settings',
            icon: Settings,
            links: settingsLinks,
        },
    ];

    return (
        <Accordion type="multiple" value={openAccordionItems} onValueChange={setOpenAccordionItems}>
            {links.map((accordionLink) => (
                <AccordionItem key={accordionLink.key} value={accordionLink.key}>
                    <AccordionTrigger>
                        {accordionLink.icon && (
                            <Icon iconNode={accordionLink.icon} className="size-4" />
                        )}
                        {accordionLink.title}
                    </AccordionTrigger>
                    <AccordionContent className="pl-5">
                        <DropdownMenuGroup>
                            {accordionLink.links.map((link) => (
                                <DropdownMenuItem
                                    key={getHref(link)}
                                    onClick={() => router.visit(getHref(link))}
                                    data-active={isActiveHref(url, link)}
                                    className={
                                        isActiveHref(url, link)
                                            ? 'bg-accent text-accent-foreground'
                                            : ''
                                    }
                                >
                                    {link.icon && <Icon iconNode={link.icon} className="size-4" />}
                                    {link.title}
                                    {link.shortcut && (
                                        <DropdownMenuShortcut>
                                            {formatShortcut(link.shortcut)}
                                        </DropdownMenuShortcut>
                                    )}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
