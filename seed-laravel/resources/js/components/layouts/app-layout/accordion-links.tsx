import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

import type { TShared } from '@/types/props';
import type { TAccordionLink } from '@/types/utils';

import { formatShortcut } from '@/lib/format';
import { getHref, isActiveHref } from '@/lib/href';
import { accordionLinks } from '@/lib/links';
import { useApplicationStore } from '@/stores/use-application-store';
import { router, usePage } from '@inertiajs/react';

import { Icon } from '@/components/ui/icon';

export const AccordionLinks = () => {
    const { url, props } = usePage<TShared>();
    const { openAccordionItems, setOpenAccordionItems } = useApplicationStore();

    const foldersLinks: TAccordionLink = {
        key: 'folders',
        title: 'Folders',
        links:
            props.auth.user.folders?.map((folder) => ({
                title: folder.name,
                route: 'settings.appearance.edit',
            })) || [],
    };

    const links = [foldersLinks, ...accordionLinks];

    return (
        <Accordion type="multiple" value={openAccordionItems} onValueChange={setOpenAccordionItems}>
            {links.map((accordionLink) => (
                <AccordionItem key={accordionLink.key} value={accordionLink.key}>
                    <AccordionTrigger>{accordionLink.title}</AccordionTrigger>
                    <AccordionContent>
                        <DropdownMenuGroup>
                            {accordionLink.links.map((link) => (
                                <DropdownMenuItem
                                    key={link.route || link.href}
                                    onClick={() => router.visit(getHref(link))}
                                    data-active={isActiveHref(url, link)}
                                    className={
                                        isActiveHref(url, link)
                                            ? 'bg-accent text-accent-foreground'
                                            : ''
                                    }
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
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};
