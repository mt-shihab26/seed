import type { TLink } from '@/types/utils';

const toURL = (href: string): URL => {
    return new URL(href, window.location.origin);
};

const toRelative = (url: URL): string => {
    return url.pathname + url.search + url.hash;
};

export const href = {
    query: {
        get: (href: string, name: string): string | null => {
            return toURL(href).searchParams.get(name);
        },
        update: (href: string, name: string, value: string): string => {
            const url = toURL(href);
            url.searchParams.set(name, value);
            return toRelative(url);
        },
        remove: (href: string, name: string): string => {
            const url = toURL(href);
            url.searchParams.delete(name);
            return toRelative(url);
        },
        removes: (href: string, names: string[]): string => {
            const url = toURL(href);
            names.forEach((name) => {
                url.searchParams.delete(name);
            });
            return toRelative(url);
        },
    },
    redirect: (url: string): void => {
        window.location.href = url;
    },
};

export const getHref = (link: TLink): string => {
    return link.route ? route(link.route) : link.href || '';
};

export const isActiveHref = (url: string, link: TLink): boolean => {
    return link.route ? route().current(link.route) : link.href === url;
};
