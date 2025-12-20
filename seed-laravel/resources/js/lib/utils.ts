import type { InertiaLinkProps } from '@inertiajs/react';
import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const isSameUrl = (
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) => {
    return resolveUrl(url1) === resolveUrl(url2);
};

export const resolveUrl = (url: NonNullable<InertiaLinkProps['href']>): string => {
    return typeof url === 'string' ? url : url.url;
};
