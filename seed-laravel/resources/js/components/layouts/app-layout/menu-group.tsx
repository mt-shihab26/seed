import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';

import type { ColorName } from '@/lib/colors';
import type { TShared } from '@/types/props';
import type { TLink } from '@/types/utils';

import { getColorClasses } from '@/lib/colors';
import { getHref, isActiveHref } from '@/lib/href';
import { router, usePage } from '@inertiajs/react';

import { Icon } from '@/components/elements/icon';
import { RenderKDB } from '@/components/elements/render-kbd';
import { cn } from '@/lib/utils';

export const MenuGroup = ({ links }: { links: TLink[] }) => {
    const { url } = usePage<TShared>();

    return (
        <DropdownMenuGroup>
            {links.map((link) => {
                const colorClasses = link.color ? getColorClasses(link.color as ColorName) : null;

                return (
                    <DropdownMenuItem
                        key={getHref(link)}
                        onClick={() => router.visit(getHref(link))}
                        data-active={isActiveHref(url, link)}
                        className={cn(
                            isActiveHref(url, link) ? 'bg-accent text-accent-foreground' : '',
                        )}
                        style={{ color: colorClasses?.hex }}
                    >
                        {link.color && colorClasses && (
                            <div
                                className={`size-2 shrink-0 rounded-full ${colorClasses.bg}`}
                                aria-hidden="true"
                            />
                        )}
                        {link.icon && <Icon node={link.icon} className="size-4" />}
                        {link.title}
                        {link.shortcut && (
                            <DropdownMenuShortcut>
                                <RenderKDB keys={link.shortcut} />
                            </DropdownMenuShortcut>
                        )}
                    </DropdownMenuItem>
                );
            })}
        </DropdownMenuGroup>
    );
};
