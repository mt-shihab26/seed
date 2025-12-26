import { AppearanceTabs } from '@/components/elements/appearance-tabs';
import { HeadingSmall } from '@/components/elements/heading-small';

import { SettingLayout } from '@/components/layouts/setting-layout';

const Appearance = () => {
    return (
        <SettingLayout title="Appearance settings">
            <div className="space-y-6">
                <HeadingSmall
                    title="Appearance settings"
                    description="Update your account's appearance settings"
                />
                <AppearanceTabs />
            </div>
        </SettingLayout>
    );
};

export default Appearance;
