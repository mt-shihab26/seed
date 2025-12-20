export type TBreadcrumb = {
    title: string;
    route?: string;
};

export type TLink = {
    title: string;
    icon?: LucideIcon | null;
} & ({ route: string; href?: never } | { route?: never; href: string });
