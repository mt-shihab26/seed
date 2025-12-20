export type TBreadcrumb = {
    title: string;
    route?: string;
};

export type TLink = {
    title: string;
    icon?: LucideIcon | null;
    shortcut?: string;
} & ({ route: string; href?: never } | { route?: never; href: string });
