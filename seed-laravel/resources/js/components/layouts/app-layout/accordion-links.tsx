import type { TShared } from '@/types/props';

import { settingsLinks } from '@/lib/links';
import { useKeyboardShortcuts } from '@/providers/keyboard-shortcuts-provider';
import { useApplicationStore } from '@/stores/use-application-store';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import { AccordionTrigger } from '@/components/patch/accordion';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { Icon } from '@/components/ui/icon';
import { Folder, Folders, Settings, Tag, Tags } from 'lucide-react';
import { MenuGroup } from './menu-group';

export const AccordionLinks = () => {
    const { props } = usePage<TShared>();
    const { openAccordionItems, setOpenAccordionItems } = useApplicationStore();
    const { registerLinks } = useKeyboardShortcuts();

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

    useEffect(() => {
        links.forEach((accordionLink) => {
            registerLinks(accordionLink.links);
        });
    }, [registerLinks, props.auth.user.folders, props.auth.user.tags]);

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
                            <MenuGroup links={accordionLink.links} />
                        </DropdownMenuGroup>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
