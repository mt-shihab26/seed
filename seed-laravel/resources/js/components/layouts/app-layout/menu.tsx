import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useRegisterShortcut } from '@/hooks/use-register-shortcut';
import { APP_NAME } from '@/lib/env';
import { useState } from 'react';

import { AppLogoIcon } from '@/components/icons/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { ChevronDownIcon, XIcon } from 'lucide-react';
import { MenuContent } from './menu-content';

export const Menu = () => {
    const [open, setOpen] = useState<boolean>(false);

    const menuKey = 'j';

    useRegisterShortcut('menu-toggle', [menuKey], () => setOpen((prev) => !prev));

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
                            <Kbd className="border border-border">J</Kbd>
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
                <Button
                    onClick={() => setOpen(false)}
                    className="absolute top-2 right-2"
                    variant="ghost"
                    size="icon"
                >
                    <XIcon className="size-4" />
                </Button>
                <MenuContent />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
