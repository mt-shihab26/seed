import { Head } from '@inertiajs/react';

import { AppearanceTabs } from '@/components/elements/appearance-tabs';
import { HeadingSmall } from '@/components/elements/heading-small';

import { AppLayout } from '@/components/layouts/app-layout';
import { SettingsLayout } from '@/components/layouts/settings-layout';

const Appearance = () => {
    return (
        <AppLayout
            breadcrumbs={[
                {
                    title: 'Settings',
                    href: 'settings.redirect',
                },
                {
                    title: 'Appearance',
                    href: 'settings.appearance.edit',
                },
            ]}
        >
            <Head title="Appearance settings" />
            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
};

export default Appearance;
