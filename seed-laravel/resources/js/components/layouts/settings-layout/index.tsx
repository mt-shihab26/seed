import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { Heading } from '@/components/elements/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Link } from '@inertiajs/react';
import { KeyRound, Palette, ShieldCheck, UserCircle } from 'lucide-react';

const links: { title: string; route: string; icon?: LucideIcon }[] = [
    {
        title: 'Profile',
        route: 'settings.profile.edit',
        icon: UserCircle,
    },
    {
        title: 'Password',
        route: 'settings.password.edit',
        icon: KeyRound,
    },
    {
        title: 'Two-Factor Auth',
        route: 'settings.two-factor.show',
        icon: ShieldCheck,
    },
    {
        title: 'Appearance',
        route: 'settings.appearance.edit',
        icon: Palette,
    },
];

export const SettingsLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="px-4 py-6">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />
            <div className="flex flex-col lg:flex-row lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {links.map((link) => (
                            <Button
                                key={link.route}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': route().current(link.route),
                                })}
                            >
                                <Link href={link.route}>
                                    {link.icon && (
                                        <link.icon className="h-4 w-4" />
                                    )}
                                    {link.title}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </aside>
                <Separator className="my-6 lg:hidden" />
                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
};
