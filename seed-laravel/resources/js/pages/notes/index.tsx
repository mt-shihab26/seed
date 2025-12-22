import type { TNote } from '@/types/models';

import { AppLayout } from '@/components/layouts/app-layout';
import { Notes } from '@/components/screens/notes';
import { Head } from '@inertiajs/react';

const Index = ({ notes, title }: { notes: TNote[]; title: string }) => {
    return (
        <AppLayout>
            <Head title={title} />
            <Notes title={title} notes={notes} />
        </AppLayout>
    );
};

export default Index;
