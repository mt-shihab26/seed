export type TBreadcrumb = {
    title: string;
    href: string;
};

export type TLink = {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
};
