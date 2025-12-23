import { AppearanceTabs } from '@/components/elements/appearance-tabs';
import { HeadingSmall } from '@/components/elements/heading-small';

import { SettingsLayout } from '@/components/layouts/settings-layout';

const Appearance = () => {
    return (
        <SettingsLayout title="Appearance settings">
            <div className="space-y-6">
                <HeadingSmall
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                />
                <AppearanceTabs />
            </div>
        </SettingsLayout>
    );
};

export default Appearance;
