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

export const SettingsLayout = ({ title, children }: { title: string; children: ReactNode }) => {
    const { url } = usePage();

    return (
        <AppLayout>
            <Head title={title} />
            <div className="px-4 py-6">
                <Heading title="Settings" description="Manage your profile and account settings" />
                <div className="flex flex-col lg:flex-row lg:space-x-12">
                    <aside className="w-full max-w-xl lg:w-48">
                        <nav className="flex flex-col space-y-1 space-x-0">
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
                                        {link.icon && <link.icon className="h-4 w-4" />}
                                        {link.title}
                                    </Link>
                                </Button>
                            ))}
                        </nav>
                    </aside>
                    <Separator className="my-6 lg:hidden" />
                    <div className="max-h-[calc(100vh-12rem)] flex-1 overflow-y-auto pr-2.5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-muted">
                        <section className="max-w-xl space-y-12">{children}</section>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
