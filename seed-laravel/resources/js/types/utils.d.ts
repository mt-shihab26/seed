import type { LucideIcon } from 'lucide-react';

export type TBreadcrumb = {
    title: string;
    route?: string;
};

export type TLink = {
    title: string;
    icon?: LucideIcon;
    shortcut?: string[];
} & ({ route: string; href?: never } | { route?: never; href: string });

export type TAccordionLink = {
    key: string;
    title: string;
    icon?: LucideIcon;
    links: TLink[];
};
