import type { ReactNode } from 'react';

import { getHref, isActiveHref } from '@/lib/href';
import { settingsLinks } from '@/lib/links';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

import { Heading } from '@/components/elements/heading';
import { AppLayout } from '@/components/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Head, Link } from '@inertiajs/react';

export const SettingLayout = ({ title, children }: { title: string; children: ReactNode }) => {
    const { url } = usePage();

    return (
        <AppLayout>
            <Head title={title} />
            <Heading title="Settings" description="Manage your profile and account settings" />
            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="flex w-full max-w-xl flex-col space-y-1 space-x-0 lg:w-48">
                    {settingsLinks.map((link) => (
                        <Button
                            key={link.route}
                            size="sm"
                            variant="ghost"
                            asChild
                            className={cn('w-full justify-start', {
                                'bg-muted': isActiveHref(url, link),
                            })}
                        >
                            <Link href={getHref(link)}>
                                {link.icon && <link.icon className="size-4" />}
                                {link.title}
                            </Link>
                        </Button>
                    ))}
                </aside>
                <Separator className="my-6 lg:hidden" />
                <section className="w-full flex-1 space-y-12">{children}</section>
            </div>
        </AppLayout>
    );
};
