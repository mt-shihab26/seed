import type { TShared } from '@/types/props';

import { pagesLinks } from '@/lib/links';
import { useKeyboardShortcuts } from '@/providers/keyboard-shortcuts-provider';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';

import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { AccordionLinks } from './accordion-links';
import { MenuGroup } from './menu-group';

export const MenuContent = () => {
    const { props } = usePage<TShared>();
    const { registerLinks } = useKeyboardShortcuts();

    useEffect(() => {
        registerLinks(pagesLinks);
    }, [registerLinks]);

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
                <MenuGroup links={pagesLinks} />
                <DropdownMenuSeparator />
                <AccordionLinks />
            </div>
        </>
    );
};
